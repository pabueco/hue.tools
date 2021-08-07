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
	class="relative transition rounded-2xl p-4 flex-1 flex flex-col justify-end cursor-pointer"
>

  {#if deletable}

    <button
      class="absolute z-20 top-3 right-3 block opacity-40 hover:opacity-100 transition"
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
		class="absolute top-5 text-lg font-medium opacity-80 inset-x-0 text-center"
		style="color: {textColor};"
	>
		{colorName}
	</div>

	{#if isColorPickerVisible}
		<div
			class="bg-black text-white bg-opacity-75 rounded-xl p-5 flex justify-center items-center mb-5 shadow-lg"
		>
			<ColorPicker bind:color={color} on:change={findColorName} />
		</div>
	{/if}
	<button
		class="absolute left-5 bottom-5"
		on:click={() => (isColorPickerVisible = !isColorPickerVisible)}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
			/>
		</svg>
	</button>
	<input
		type="text"
		value={color.hex()}
		class="text-center font-semibold text-xl bg-transparent focus:outline-none w-full min-w-0"
		on:blur={(e) => onColorInput(e)}
		on:keyup={(e) => e.key === 'Enter' && onColorInput(e)}
	/>
</div>
