<script lang="ts">
  import { getContext } from 'svelte';
  import { type Writable } from 'svelte/store';
  
  export let title: string;
</script>

<input type="text" bind:value={title} />

<style>
  input {
    border: none;
    margin: .5em 0;
    border-bottom: 2px solid #777;
    background-color: #555;
    padding: .5em;
    color: white;
    font-size: 1.4em;
    font-weight: normal;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }
</style>