<script lang="ts">
  import Moveable, { type BoundType, type OnDrag, type OnResize } from "svelte-moveable";
  export let target;
  export let positionX = 0;
  export let positionY = 0;
  export const destroyMoveable = () => {
    ref.destroy();
  };
  let ref: Moveable;
  const snappable = true;
  const bounds: BoundType = {
    "left": 0,
    "top": 0,
    "right": 0,
    "bottom": 0,
    position: "css"
  };

  function onDrag(ev: OnDrag) {
    [positionX, positionY] = ev.beforeTranslate;
    ev.target.style.transform = ev.transform;
  }

  function onResize(ev: OnResize) {
    const [width, height] = [Math.max(ev.width, 100), Math.max(ev.height, 100)];
    ev.target.style.width = `${width}px`;
    ev.target.style.height = `${height}px`;
    ev.target.style.transform = ev.drag.transform;
  }
</script>


<Moveable
  bind:this={ref}
  {target}
  origin={false}
  edge={false}
  dragArea={false}
  edgeDraggable={true}
  {snappable}
  {bounds}
  draggable={true}
  throttleDrag={50}
  on:drag={({ detail }) => onDrag(detail)}
  renderDirections={["nw", "ne", "se", "sw"]}
  resizable={true}
  keepRatio={false}
  throttleResize={50}
  on:resize={({ detail }) => onResize(detail)}
/>