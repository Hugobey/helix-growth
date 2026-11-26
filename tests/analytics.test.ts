import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { filterAnalyticsEvent, isLocalAnalyticsHost, shouldRecordAnalytics } from "../src/lib/analytics.ts";
import {
  DEVICE_KEY,
  OWNER_VALUE,
  deviceFlag,
  expiredOwnerCookie,
  ownerCookie,
  readOwnerMarker,
  setOwnerDeviceForTests,
  sharedOwnerDomain,
} from "../src/lib/device.ts";

afterEach(() => {
  setOwnerDeviceForTests(null);
});

describe("local hosts", () => {
  it("treats loopback names as local", () => {
    assert.equal(isLocalAnalyticsHost("localhost"), true);
    assert.equal(isLocalAnalyticsHost("127.0.0.1"), true);
    assert.equal(isLocalAnalyticsHost("::1"), true);
    assert.equal(isLocalAnalyticsHost("[::1]"), true);
    assert.equal(isLocalAnalyticsHost("0.0.0.0"), true);
    assert.equal(isLocalAnalyticsHost("app.localhost"), true);
    assert.equal(isLocalAnalyticsHost("www.helixgrowth.io"), false);
    assert.equal(isLocalAnalyticsHost("helixgrowth.io"), false);
  });

  it("records a public visit only when this browser is not marked", () => {
    assert.equal(shouldRecordAnalytics("www.helixgrowth.io", false), true);
    assert.equal(shouldRecordAnalytics("helixgrowth.io", true), false);
    assert.equal(shouldRecordAnalytics("127.0.0.1", false), false);
    assert.equal(shouldRecordAnalytics("localhost", true), false);
  });
});

describe("owner marker", () => {
  it("reads the query, storage, and cookie", () => {
    assert.equal(deviceFlag("?hg-device=owner"), "owner");
    assert.equal(deviceFlag("hg-device=clear&x=1"), "clear");
    assert.equal(deviceFlag("?utm=1"), null);
    assert.equal(readOwnerMarker(OWNER_VALUE, null), true);
    assert.equal(readOwnerMarker(null, `${DEVICE_KEY}=${OWNER_VALUE}`), true);
    assert.equal(readOwnerMarker(null, "other=1"), false);
  });

  it("shares the cookie across helixgrowth.io hosts", () => {
    assert.equal(sharedOwnerDomain("www.helixgrowth.io"), ".helixgrowth.io");
    assert.equal(sharedOwnerDomain("helixgrowth.io"), ".helixgrowth.io");
    assert.equal(sharedOwnerDomain("127.0.0.1"), undefined);
    assert.match(ownerCookie(true, ".helixgrowth.io"), /Domain=\.helixgrowth.io/);
    assert.match(ownerCookie(true, ".helixgrowth.io"), /Secure/);
    assert.doesNotMatch(ownerCookie(false), /Domain=/);
    assert.match(expiredOwnerCookie(".helixgrowth.io"), /Max-Age=0/);
  });
});

describe("before send", () => {
  it("drops loopback and this browser", () => {
    setOwnerDeviceForTests(false);
    assert.equal(filterAnalyticsEvent({ type: "pageview", url: "http://127.0.0.1:5180/" }), null);
    assert.equal(filterAnalyticsEvent({ type: "pageview", url: "http://localhost:5180/pricing" }), null);
    setOwnerDeviceForTests(true);
    assert.equal(filterAnalyticsEvent({ type: "pageview", url: "https://www.helixgrowth.io/" }), null);
  });

  it("keeps a public page view and strips the opt-out query", () => {
    setOwnerDeviceForTests(false);
    const kept = filterAnalyticsEvent({ type: "pageview", url: "https://www.helixgrowth.io/pricing" });
    assert.deepEqual(kept, { type: "pageview", url: "https://www.helixgrowth.io/pricing" });
    const stripped = filterAnalyticsEvent({
      type: "pageview",
      url: "https://www.helixgrowth.io/pricing?hg-device=owner&utm=letter#fit",
    });
    assert.deepEqual(stripped, { type: "pageview", url: "https://www.helixgrowth.io/pricing?utm=letter" });
  });
});
