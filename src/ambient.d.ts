import type { Writable } from "svelte/store";

// Timer type
export type TTimer = {
  id: string,
  remainingTime: Writable<number>,
  setTime: Writable<number>,
  title: Writable<string>
}