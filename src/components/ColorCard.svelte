<script lang="ts">
	import { mostReadable, TinyColor } from '@ctrl/tinycolor';

	import chroma from 'chroma-js';
	import { nearest } from '$src/utils/colors';
	import { createEventDispatcher } from 'svelte';

	import ColorPicker from './ColorPicker.svelte';
  import { clickOutside } from '$src/directives/clickoutside';

	export let color: chroma.Color;
  export let deletable: boolean = false;

	let isColorPickerVisible = false;

	let colorInput: string;
	let colorName: string;


	$: textColor = mostReadable(color.hex(), ['#fff', '#000']).toHexString();

	const dispatch = createEventDispatcher<{ delete }>();

	const findColorName = () => {
		colorName = nearest(color.hex()).name;
	};

	const onColorInput = async (event) => {
		colorInput = event.target.value;
    color = chroma(colorInput)
		findColorName();
	};

  findColorName()
  
</script>

<div
  use:clickOutside
  on:clickoutside={() => isColorPickerVisible = false}
	on:click|self={() => (isColorPickerVisible = !isColorPickerVisible)}
	style="color: {textColor}; background-color: {color.hex?.()}; box-shadow: 0 10px 30px -10px {color
		.alpha(0.75)
		.css()}"
	class="relative transition rounded-2xl p-4 flex-1 flex flex-col justify-end cursor-pointer group"
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
		class="absolute top-4 text-lg font-medium opacity-80 inset-x-0 text-center"
		style="color: {textColor};"
	>
		{colorName}
	</div>

  <button
    class="absolute left-5 top-5 opacity-70 group-hover:opacity-100 transition"
    on:click={() => (isColorPickerVisible = !isColorPickerVisible)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  </button>

	<div class="bg-black bg-opacity-25 text-white hover:bg-opacity-50 focus:bg-opacity-50 rounded-3xl transition mt-12 {isColorPickerVisible ? 'bg-opacity-50' : ''}">
    {#if isColorPickerVisible}
      <div class="w-full flex justify-center pt-8 mb-5">
        <ColorPicker bind:color={color} on:change={findColorName} />
      </div>
    {/if}
    
    <input
      type="text"
      value={color.hex()}
      class="transition text-center font-semibold text-lg tracking-wider bg-transparent focus:outline-none w-full min-w-0 h-12 rounded-full"
      on:blur={(e) => onColorInput(e)}
      on:keyup={(e) => e.key === 'Enter' && onColorInput(e)}
    />
  </div>
</div>
