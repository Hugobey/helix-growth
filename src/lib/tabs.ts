import type { KeyboardEvent } from "react";

export function onTabKey(event: KeyboardEvent, index: number, count: number, select: (next: number) => void) {
  const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
  if (!keys.includes(event.key)) return;
  event.preventDefault();
  let next = index;
  if (event.key === "ArrowRight") next = (index + 1) % count;
  if (event.key === "ArrowLeft") next = (index - 1 + count) % count;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = count - 1;
  select(next);
}
