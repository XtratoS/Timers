<script lang="ts">
  import { getContext, onMount, setContext } from "svelte";
  import Moveable from "./Moveable.svelte";
  import Pause from "./Icons/Pause.svelte";
  import Play from "./Icons/Play.svelte";
  import Reset from "./Icons/Reset.svelte";
  import Modal from "./EditTimerModal.svelte";
  import { get, type Writable } from "svelte/store";
  import { displayTime } from "$lib/utils";
  import Edit from "./Icons/Edit.svelte";
  import type { TTimer } from "../../ambient";

  export let remainingTime: Writable<number>;
  export let setTime: Writable<number>;
  export let title: Writable<string>;
  export let id: string;

  setContext("remainingTime", remainingTime);
  setContext("setTime", setTime);
  setContext("title", title);
  
  let timerStore = getContext<Writable<TTimer[]>>("timers");
  let target: HTMLDivElement;
  let outerContainer: HTMLDivElement;
  let previousTime = Date.now();
  let currentTime = Date.now();
  let interval: NodeJS.Timeout | number = NaN;

  onMount(() => {
    console.log(target);
    remainingTime.set(get(setTime));
    target.addEventListener("click", handleTimerClick);
  });

  function handleStartButtonClick(ev: MouseEvent) {
    ev.stopPropagation();
    if (get(remainingTime) <= 0) return;
    previousTime = Date.now();
    currentTime = previousTime;
    interval = setInterval(() => {
      currentTime = Date.now();
      const elapsedTime = currentTime - previousTime;
      const newRemainingTime = get(remainingTime) - elapsedTime;
      previousTime = currentTime;
      if (newRemainingTime <= 0) {
        remainingTime.set(0);
        clearInterval(interval);
      } else {
        remainingTime.set(newRemainingTime);
      }
    }, 100);
  }

  function handlePauseButtonClick(ev: MouseEvent) {
    ev.stopPropagation();
    pauseTimer();
  }

  function handleResetButtonClick(ev: MouseEvent) {
    ev.stopPropagation();
    if (interval) {
      pauseTimer();
    }
    remainingTime.set(get(setTime));
  }

  function handleTimerClick() {
    if (interval) {
      pauseTimer();
    }
    const dialog: HTMLDialogElement = document.querySelector(`#${id}`)!;
    dialog.showModal();
  }

  function pauseTimer() {
    clearInterval(interval);
    interval = NaN;
  }

  const destroy = () => {
    clearInterval(interval);
    outerContainer.remove();
    // remove the timer from the timers context
    timerStore.update((timers) => {
      return timers.filter((timer) => timer.id !== id);
    });
  }
</script>

<div class="outer-container" bind:this={outerContainer}>
  <Moveable
    bind:target
  />

  <div class="container" bind:this={target}>
    <div class="row">
      <div class="timer-title">
        {$title}
      </div>
      <div class="edit">
        <button class="btn edit-btn" on:click={handleTimerClick}>
          <Edit size={24} color="#604a00" />
        </button>
      </div>
    </div>
    <button class="timer">{displayTime($remainingTime)}</button>
    <div class="set-time">{displayTime($setTime)}</div>
    <div class="action-btns">
      <button class:display-none={!interval} class="btn pause-btn" on:click={handlePauseButtonClick}>
        <Pause size={24} color="#604a00" />
      </button>
      <button class:display-none={interval} class="btn play-btn" on:click={handleStartButtonClick}>
        <Play size={24} color="darkgreen" />
      </button>
      <button class="btn reset-btn" on:click={handleResetButtonClick}>
        <Reset size={24} color="darkred" />
      </button>
    </div>
  </div>

  <Modal
    {destroy}
    dialogId={id}
  />
</div>

<style>
  .container {
    position: absolute;
    height: 150px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4px;
    box-sizing: border-box;
    user-select: none;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .timer-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
  }
  .timer {
    border: none;
    background-color: inherit;
    font-size: 2em;
    height: 1.5em;
    text-align: center;
  }
  .set-time {
    font-size: 0.8em;
    letter-spacing: .1em;
    color: #aaa;
    text-align: center;
  }
  .action-btns {
    margin-top: .5em;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    justify-content: center;
  }
  .btn {
    border: 1px solid rgb(220, 220, 220);
    border-radius: 4px;
    position: relative;
    height: 32px;
    width: 32px;
    display: grid;
    place-content: center;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    color: #604a00;
  }
  .btn:hover {
    filter: brightness(2);
  }
</style>
