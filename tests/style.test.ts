import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseStyle, readSiteStyle } from "../src/lib/style.ts";

describe("site style", () => {
  it("accepts only the two looks", () => {
    assert.equal(parseStyle("current"), "current");
    assert.equal(parseStyle("editorial"), "editorial");
    assert.equal(parseStyle("plain"), null);
    assert.equal(parseStyle(null), null);
  });

  it("lets the address override the saved look", () => {
    assert.equal(readSiteStyle("current", "?style=editorial"), "editorial");
    assert.equal(readSiteStyle("editorial", ""), "editorial");
    assert.equal(readSiteStyle(null, ""), "current");
    assert.equal(readSiteStyle("nope", "?style=nope"), "current");
  });
});
