<script lang="ts">
  import Timer from "$lib/components/Timer.svelte";
  import { writable } from "svelte/store";
  import type { TTimer } from "../../ambient";

  export let contextMenuX = 0;
  export let contextMenuY = 0;
  export let menuItems: { label: string; action: () => void, style?: string }[] = [];

</script>

<menu style="top: {contextMenuY}px; left: {contextMenuX}px;">
  {#each menuItems as { label, action, style }}
    <button {style} on:click={action}>{label}</button>
  {/each}
  <slot />
</menu>

<style>
  menu {
    position: absolute;
    z-index: 10000;
    background: #2b2a33;
    border: 1px solid #96959b;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    padding: 4px 0;
    border-radius: .5em;
    cursor: default;
    color: #fbfbfe;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.875rem;
    width: auto;
    min-width: 160px;
    box-sizing: border-box;
  }

  menu button {
    background: none;
    border: none;
    padding: 8px 20px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    cursor: pointer;
    outline: none;
  }

  menu button:hover {
    background-color: #52525e;
  }

  menu button:focus {
    outline: none;
    background-color: #52525e;
  }
</style>

