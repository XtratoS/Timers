<script lang="ts">
  import { getContext } from 'svelte';
  import { get, type Writable } from 'svelte/store';
  import { DisplayTime } from '$lib/utils';
  import TimerTitle from './TimerTitle.svelte';
  import TimeInput from './TimeInput.svelte';

  export let callback: () => void;
  export let destroy: Function;

  const setTimeStore = getContext<Writable<number>>("setTime");
  const titleStore = getContext<Writable<string>>("title");
  let setTime = get(setTimeStore);
  let displayTime = new DisplayTime(setTime);
  let timeValue = { hours: displayTime.getHours(), minutes: displayTime.getMinutes(), seconds: displayTime.getSeconds() };
  let title = get(titleStore);

  function handleSaveButtonClick(ev: MouseEvent): void {
    const { hours, minutes, seconds } = timeValue;
    setTimeStore.set((seconds + (minutes * 60) + (hours * 3600)) * 1000);
    titleStore.set(title);
    ev.stopPropagation();
    callback();
  }

  function handleCancelButtonClick(ev: MouseEvent): void {
    ev.stopPropagation();
    callback();
  }

  function handleDeleteButtonClick(ev: MouseEvent): void {
    destroy();
  }
</script>

<div class="edit-timer">
  <div class="header">
    <h2>Edit timer</h2>
    <!--Delete Button-->
    <button class="btn delete-btn" on:click={handleDeleteButtonClick}>Delete</button>
  </div>
  
  <TimerTitle bind:title />
  <TimeInput bind:timeValue />

  <div class="actions">
    <button class="btn save-btn" on:click={handleSaveButtonClick}>Save</button>
    <button class="btn cancel-btn" on:click={handleCancelButtonClick}>Cancel</button>
  </div>
</div>

<style>
  .edit-timer {
    background: #333;
    color: white;
    padding: 1em;
    border-radius: 8px;
  }
  .header {
    height: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 1em;
  }
  .btn {
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    border-radius: .5em;
  }
  .save-btn {
    background: #007bff;
    padding: 8px 16px;
    cursor: pointer;
    flex: 1;
  }
  .save-btn:hover {
    background: #0056b3;
  }
  .cancel-btn {
    background: #6c757d;
    padding: 8px 16px;
    cursor: pointer;
    flex: 1;
  }
  .cancel-btn:hover {
    background: #495057;
  }
  .delete-btn {
    background: #dc3545;
    padding: 8px 16px;
    cursor: pointer;
  }
  .delete-btn:hover {
    background: #a71d2a;
  }
</style>