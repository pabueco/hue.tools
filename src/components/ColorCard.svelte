<script lang="ts">
  import chroma from 'chroma-js'
  
  import { mostReadable, TinyColor } from '@ctrl/tinycolor'
  import type { ColorFormats } from '@ctrl/tinycolor'

  import { nearest } from '$src/utils/colors'
  import { createEventDispatcher } from 'svelte'

  import ColorPicker from './ColorPicker.svelte'
  import { clickOutside } from '$src/directives/clickoutside'
  import { Color } from '$src/models/Color'
  import { copyToClipboard } from '$src/utils/clipboard'
  import throttle from 'lodash/throttle'

  export let color: Color
  export let deletable: boolean = false
  export let initialFormat: string = null
  export let hasTransparency: boolean = false

  let isColorPickerVisible = false

  const defaultColor = '#000'
  let colorInput: HTMLInputElement
  let colorName: string

  let isValidColor = true

  let inputFormat: ColorFormats = (initialFormat as ColorFormats) || 'hex'

  $: textColor = mostReadable(color.hex(), ['#fff', '#000']).toHexString()

  const dispatch = createEventDispatcher<{ delete; change: { color: Color } }>()

  $: formattedColorValue = new TinyColor(color.hex()).toString(inputFormat)

  const findColorName = () => {
    colorName = nearest(color.toString('hex')).name
  }

  /*
    Check if passed argument is a valid color and update `isValidColor` accordingly
  */
  const validateColor = (value: string) => isValidColor = chroma.valid(value)

  /*
    Set passed color as active if it's a valid color
  */
  const setNewColor = async (newColor: string) => {
    validateColor(newColor)
    if (!isValidColor) return

    color = new Color(newColor)
    inputFormat = new TinyColor(newColor).format
    findColorName()

    dispatch('change', {
      color,
    })
  }

  /*
    Proceed with color change if the user's input isn't empty, otherwise - set default color as active
  */
  const onColorInputChange = () => colorInput.value ? setNewColor(colorInput.value) : setNewColor(defaultColor)
  
  const findColorNameThrottled = throttle(() => {
    colorName = nearest(color.toString('hex')).name
  }, 400)

  const onColorPickerUpdate = () => {
    validateColor(colorInput.value) // Udpate `isValidColor`
    findColorNameThrottled()
  }

  const onColorPickerChange = () => {
    // findColorName();
    dispatch('change', {
      color,
    })
  }

  findColorName()
</script>

<div
  use:clickOutside
  on:clickoutside={() => (isColorPickerVisible = false)}
  on:click|self={() => (isColorPickerVisible = !isColorPickerVisible)}
  style="color: {textColor}; background-color: {color.hex?.()}; box-shadow: 0 10px 30px -10px {color.chroma
    .alpha(color.chroma.alpha() - color.chroma.alpha() / 4)
    .css()}"
  class="relative rounded-2xl p-4 flex-1 flex flex-col justify-end cursor-pointer group min-h-[175px]"
>
  {#if deletable}
    <button
      class="absolute z-20 top-5 right-5 block opacity-40 hover:opacity-100 transition"
      on:click={() => dispatch('delete')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  {/if}

  <div
    class="absolute top-4 text-lg font-medium opacity-80 transition-opacity hover:opacity-100 left-1/2 transform -translate-x-1/2 text-center"
    style="color: {textColor};"
    on:click={(e) => copyToClipboard(e, colorName, 'Name copied!')}
  >
    {colorName}
  </div>

  <button
    class="absolute left-5 top-5 opacity-70 group-hover:opacity-100 transition"
    on:click={() => (isColorPickerVisible = !isColorPickerVisible)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
      />
    </svg>
  </button>

  <div
    class="bg-black {isValidColor ? 'bg-opacity-25' : 'bg-opacity-50'} text-white hover:bg-opacity-50 focus:bg-opacity-50 rounded-3xl transition mt-12 relative {isColorPickerVisible
      ? 'bg-opacity-50'
      : ''}"
  >
    {#if isColorPickerVisible}
      <div class="w-full flex justify-center pt-8 mb-5">
        <ColorPicker
          bind:color
          on:change={onColorPickerChange}
          on:update={onColorPickerUpdate}
          showAlphaSlider={hasTransparency}
        />
      </div>
    {/if}

    <input
      bind:this={colorInput}
      type="text"
      value={formattedColorValue}
      class="transition text-center font-semibold text-lg tracking-wider bg-transparent focus:outline-none w-full min-w-0 h-12 rounded-full"
      on:blur={() => onColorInputChange()}
      on:keyup={(e) => e.key === 'Enter' && onColorInputChange()}
    />

    <!-- 
      Show icon to copy to clipboard the color value
      If the input value isn't a valid color - show the warning icon instead
    -->
    {#if isValidColor}
      <button
        on:click={(e) => copyToClipboard(e, formattedColorValue, 'Copied!')}
        class="transition text-white opacity-60 hover:opacity-100 absolute left-[18px] bottom-[11px]"
        title="Copy"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
      
      {:else}
      <button
          class="absolute left-[20px] bottom-[2px]"
          title="Invalid color"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="red" class="h-8 w-8" viewBox="0 0 24 24" stroke="red">
          <path stroke-width="0.7" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path stroke-width="0.7" d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
      </button>
    {/if}
  </div>
</div>
