<script lang="ts">
  import ContextMenu from '$lib/components/ContextMenu.svelte';
  import Timer from "$lib/components/Timer.svelte";
  import { writable } from "svelte/store";
  import type { TTimer } from "../ambient";

  let timers: TTimer[] = [];
  let showContextMenu = false;
  let contextMenuX = 0;
  let contextMenuY = 0;

  const addTimer = (x?: number, y?: number) => {
    timers = [...timers, {
      remainingTime: writable(300000),
      setTime: writable(300000),
      title: writable(`Timer ${timers.length + 1}`)
    }];
  };
</script>

<svelte:document on:contextmenu|preventDefault={(ev) => {
  showContextMenu = true;
  contextMenuX = ev.clientX;
  contextMenuY = ev.clientY;
}} on:click|preventDefault={() => showContextMenu = false} />

{#each timers as timer}
  <Timer
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
      { label: "Add Timer", action: addTimer }
    ]}
  />
{/if}