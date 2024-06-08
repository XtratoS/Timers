<script lang="ts">
  import { DisplayTime } from "$lib/utils";
  import { getContext, onMount } from "svelte";
  import { get, type Writable } from "svelte/store";

  let hoursInput: HTMLInputElement;
  let minutesInput: HTMLInputElement;
  let secondsInput: HTMLInputElement;
  export let timeValue: { hours: number, minutes: number, seconds: number };

  let intervalId: number;

  $: inputsArray = [hoursInput, minutesInput, secondsInput];

  function getNextValue(value: string): string {
    let numericValue = parseInt(value);
    if (numericValue >= 59) {
      numericValue = 0;
    } else {
      numericValue++;
    }
    return numericValue.toString().padStart(2, "0");
  }

  function getPreviousValue(value: string): string {
    let numericValue = parseInt(value);
    if (numericValue <= 0) {
      numericValue = 59;
    } else {
      numericValue--;
    }
    return numericValue.toString().padStart(2, "0");
  }

  function handleIncrement (elem: HTMLInputElement) {
    elem.value = getNextValue(elem.value);
    elem.select();
  }

  const handleDecrement = (elem: HTMLInputElement) => {
    elem.value = getPreviousValue(elem.value);
    elem.select();
  }

  const handleInputKeyDown = (ev: KeyboardEvent) => {
    const target = ev.target as HTMLInputElement;
    const currentValue = target.value;
    ev.preventDefault();

    if (ev.key === "ArrowUp") {
      handleIncrement(target);
      return;
    } else if (ev.key === "ArrowDown") {
      handleDecrement(target);
      return;
    }

    if (ev.key === "Tab") {
      const index = inputsArray.indexOf(target);
      if (index !== -1) {
        inputsArray[(index+1)%(inputsArray.length)].select();
      }
      return;
    }

    const numericValue = parseInt(ev.key);
    if (isNaN(numericValue)) return;
    target.value = currentValue.substring(1) + numericValue;
    target.select();
    return;
  }

  onMount(() => {
    [hoursInput, minutesInput, secondsInput].forEach(inputElem => {
      ["click","focus"].forEach(e => {
        inputElem.addEventListener(e, (ev) => {
          (ev.target as HTMLInputElement).select();
        });
      });
      inputElem.addEventListener("keydown", handleInputKeyDown);
    });
  });

  function adjustTime(input: HTMLInputElement, amount: number) {
    let value = parseInt(input.value) + amount;
    if (value < 0) value = 59;
    if (value > 59) value = 0;
    input.value = value.toString().padStart(2, "0");
    timeValue[input.id as keyof typeof timeValue] = value;
  }

  function startAdjusting(input: HTMLInputElement, amount: number) {
    adjustTime(input, amount);
    intervalId = setInterval(() => adjustTime(input, amount), 100);
  }

  function stopAdjusting() {
    clearInterval(intervalId);
  }
</script>

<div class="time-input">
  <div class="col">
    <button
      class="time-change-btn"
      on:mousedown={() => startAdjusting(hoursInput, 1)}
      on:mouseup={stopAdjusting}
      on:mouseleave={stopAdjusting}
    >▲</button>
    <input id="hours" bind:this={hoursInput} type="text" value={timeValue.hours} />
    <button
      class="time-change-btn"
      on:mousedown={() => startAdjusting(hoursInput, -1)}
      on:mouseup={stopAdjusting}
      on:mouseleave={stopAdjusting}
    >▼</button>
  </div>
  <span>:</span>
  <div class="col">
    <button
      class="time-change-btn"
      on:mousedown={() => startAdjusting(minutesInput, 1)}
      on:mouseup={stopAdjusting}
      on:mouseleave={stopAdjusting}
    >▲</button>
    <input id="minutes" bind:this={minutesInput} type="text" value={timeValue.minutes} />
    <button
      class="time-change-btn"
      on:mousedown={() => startAdjusting(minutesInput, -1)}
      on:mouseup={stopAdjusting}
      on:mouseleave={stopAdjusting}
    >▼</button>
  </div>
  <span>:</span>
  <div class="col">
    <button
      class="time-change-btn"
      on:mousedown={() => startAdjusting(secondsInput, 1)}
      on:mouseup={stopAdjusting}
      on:mouseleave={stopAdjusting}
    >▲</button>
    <input id="seconds" bind:this={secondsInput} type="text" value={timeValue.seconds} />
    <button
      class="time-change-btn"
      on:mousedown={() => startAdjusting(secondsInput, -1)}
      on:mouseup={stopAdjusting}
      on:mouseleave={stopAdjusting}
    >▼</button>
  </div>
</div>

<style>
  .time-input {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
  }
  input {
    border: none;
    border-top: 1px solid #555;
    border-bottom: 2px solid #777;
    padding: .2em 0;
    background: none;
    color: white;
    width: 2em;
    letter-spacing: 2px;
  }
  input:focus {
    outline: none;
    background-color: #555;
  }
  input::selection {
    background-color: #555;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1em;
  }
  input, span {
    text-align: center;
    font-size: 2em;
    line-height: 1;
  }
  .time-change-btn {
    border-radius: 4px;
    margin: 2px;
    font-size: 1.2em;
    padding: 4px 10px;
    color: #aaa;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .time-change-btn:hover {
    background-color: #555;
  }
</style>