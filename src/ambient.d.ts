import type { Writable } from "svelte/store";

// Timer type
export type TTimer = {
  remainingTime: Writable<number>,
  setTime: Writable<number>,
  title: Writable<string>
}