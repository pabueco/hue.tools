<script lang="ts">

  import iro from '@jaames/iro';
  import chroma from 'chroma-js';
  import { createEventDispatcher, onMount } from 'svelte';

  let ref: HTMLElement
  let colorPicker: iro.ColorPicker
  export let value: string

  $: if (value && colorPicker) {
    colorPicker.color.hexString = value
    // colorPicker.color.hexString = chroma(value).hex()
  }

  const dispatch = createEventDispatcher<{ change: { value: string }}>();

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
            // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
            sliderType: 'hue'
          }
        },
      ]
    });

    colorPicker.on('color:change', function(color: iro.Color) {
      value = color.hexString
    });
    
    colorPicker.on('input:end', function(color: iro.Color) {
      dispatch('change', {
        value: color.hexString
      })
    });
  })

</script>

<div bind:this={ref}></div>