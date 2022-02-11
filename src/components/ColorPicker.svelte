<script lang="ts">
  import { Color } from '$src/models/Color'
  import iro from '@jaames/iro'
  import { createEventDispatcher, onMount } from 'svelte'

  let ref: HTMLElement
  let colorPicker: iro.ColorPicker
  export let color: Color
  export let showAlphaSlider: boolean = false

  $: if (color && colorPicker) {
    colorPicker.color.hexString = color.hex()
    // colorPicker.color.hexString = chroma(color).hex()
  }

  const dispatch = createEventDispatcher<{
    change: { color: Color }
    update: { color: Color }
  }>()

  onMount(() => {
    const layout = [
      {
        component: iro.ui.Box,
        options: {},
      },
      {
        component: iro.ui.Slider,
        options: {
          // can also be 'saturation', 'color', 'red', 'green', 'blue', 'alpha' or 'kelvin'
          sliderType: 'hue',
        },
      },
    ]

    if (showAlphaSlider) {
      layout.push({
        component: iro.ui.Slider,
        options: {
          sliderType: 'alpha',
        },
      })
    }

    // @ts-ignore
    colorPicker = new iro.ColorPicker(ref, {
      color: Color.random().hex(),
      width: 225,
      boxHeight: 180,
      // padding: 12,
      // layoutDirection: 'horizontal',
      layout,
    })

    colorPicker.on('color:change', function (newColor: iro.Color) {
      color = new Color(newColor.rgbaString)

      dispatch('update', {
        color,
      })
    })

    colorPicker.on('input:end', function (newColor: iro.Color) {
      dispatch('change', {
        color: new Color(newColor.rgbaString),
      })
    })
  })
</script>

<div bind:this={ref} />
