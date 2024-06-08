<script lang="ts">
  import { onMount } from "svelte";
  import EditTimer from "./EditTimer.svelte";

  export let destroy: Function;
  export let dialogId: string;

  let ref: HTMLDialogElement;

  onMount(() => {
    ref.addEventListener("click", (ev: MouseEvent) => {
      const target = ev.target as HTMLDialogElement;
      const rect = target.getBoundingClientRect();
      const clickedInDialog = (
        rect.top <= ev.clientY &&
        ev.clientY <= rect.top + rect.height &&
        rect.left <= ev.clientX &&
        ev.clientX <= rect.left + rect.width
      );

      if (!clickedInDialog) target?.close?.();
    });
  });
</script>

<dialog bind:this={ref} id={dialogId}>
  <EditTimer
    callback={() => ref.close()}
    {destroy}
  />
</dialog>

<style>
  dialog {
    border: none;
    padding: 0;
    border-radius: 1em;
  }
</style>