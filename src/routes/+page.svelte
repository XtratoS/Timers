<script lang="ts">
  import ContextMenu from '$lib/components/ContextMenu.svelte';
  import Timer from "$lib/components/Timer.svelte";
  import { get, writable } from "svelte/store";
  import type { TTimer } from "../ambient";
  import { setContext } from 'svelte';
  import { v4 } from 'uuid';

  let timers = writable<TTimer[]>([{
    id: 'd' + v4(),
    remainingTime: writable(300000),
    setTime: writable(300000),
    title: writable("Timer 1")
  }]);

  setContext("timers", timers);

  let showContextMenu = false;
  let contextMenuX = 0;
  let contextMenuY = 0;

  const addTimer = (x?: number, y?: number) => {
    timers.update((timers_) => {
      let nextTimerTitleIndex = 1;
      while(timers_.find(timer => get(timer.title) === `Timer ${nextTimerTitleIndex}`)) {
        nextTimerTitleIndex++;
      }
      timers_.push({
        id: 'd' + v4(),
        remainingTime: writable(300000),
        setTime: writable(300000),
        title: writable("Timer " + nextTimerTitleIndex)
      });
      return timers_;
    });
  };
</script>

<svelte:window on:contextmenu|preventDefault={(ev) => {
  showContextMenu = true;
  contextMenuX = ev.clientX;
  contextMenuY = ev.clientY;
}} on:click|preventDefault={() => showContextMenu = false} />

{#each $timers as timer (timer.id)}
  <Timer
    id={timer.id}
    bind:remainingTime={timer.remainingTime}
    bind:setTime={timer.setTime}
    bind:title={timer.title}
  />
{/each}

{#if showContextMenu}
  <ContextMenu
    bind:contextMenuX
    bind:contextMenuY
    menuItems={[
      { label: "Add Timer", action: addTimer },
      { label: "Clear Timers", action: () => timers.set([]) },
      { label: "Close", action: () => showContextMenu = false, style: "color: #FF474C;"}
    ]}
  />
{/if}