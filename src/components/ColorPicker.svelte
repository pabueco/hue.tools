<script lang="ts">

  import iro from '@jaames/iro';
  import chroma from 'chroma-js';
  import { createEventDispatcher, onMount } from 'svelte';

  let ref: HTMLElement
  let colorPicker: iro.ColorPicker
  export let color: chroma.Color

  $: if (color && colorPicker) {
    colorPicker.color.hexString = color.hex()
    // colorPicker.color.hexString = chroma(color).hex()
  }

  const dispatch = createEventDispatcher<{ change: { color: chroma.Color }}>();

  onMount(() => {
    // @ts-ignore
    colorPicker = new iro.ColorPicker(ref, {
      color: chroma.random().hex(),
      width: 225,
      boxHeight: 180,
      // padding: 12,
      // layoutDirection: 'horizontal',
      layout: [
        { 
          component: iro.ui.Box,
          options: {}
        },
        { 
          component: iro.ui.Slider,
          options: {
            // can also be 'saturation', 'color', 'red', 'green', 'blue', 'alpha' or 'kelvin'
            sliderType: 'hue'
          }
        },
      ]
    });

    colorPicker.on('color:change', function(newColor: iro.Color) {
      color = chroma(newColor.hexString)
    });
    
    colorPicker.on('input:end', function(newColor: iro.Color) {
      dispatch('change', {
        color: chroma(newColor.hexString)
      })
    });
  })

</script>

<div bind:this={ref}></div>