<script lang="ts">
	import chroma from 'chroma-js';
  import { tick } from 'svelte';
	import { TinyColor, mostReadable } from '@ctrl/tinycolor';
	import ColorPicker from '../components/ColorPicker.svelte';
	import ColorSpace from '../components/ColorSpace.svelte';
	import Fieldset from '../components/Fieldset.svelte';
  import ColorBlock from '../components/ColorBlock.svelte';
  import { nearest } from '../utils/colors';
  import { currentColor } from '../store';

	let colorInput = chroma.random().hex();
  let colorName = '';

	$: colorInstance = chroma(colorInput);

	$: textColor = mostReadable(colorInput, ['#fff', '#000']).toHexString();

	let isColorPickerVisible = false;

  $: $currentColor = colorInput

  const updateColor = (value) => {
    colorInput = value
    colorName = nearest(chroma(value).hex()).name
  }

	const onColorInput = async (event) => {
    updateColor(event.target.value)
	};

  $currentColor = colorInput
  colorName = nearest(chroma(colorInput).hex()).name
</script>

<div class="flex flex-col items-center">
	<div class="container mx-auto max-w-6xl">
    <div class="flex">
      <div class="w-80 flex-1 flex flex-col">
        <div
          on:click|self={() => isColorPickerVisible = !isColorPickerVisible}
          style="color: {textColor}; background-color: {colorInstance.hex?.()}; box-shadow: 0 10px 30px -10px {colorInstance
            .alpha(0.75)
            .css()}"
          class="relative transition rounded-2xl p-4 flex-1 flex flex-col justify-end cursor-pointer"
        >

          <div class="absolute top-5 text-lg font-medium opacity-80 inset-x-0 text-center" style="color: {textColor};">
            {colorName}
          </div>

          {#if isColorPickerVisible}
            <div
              class="bg-black text-white bg-opacity-75 rounded-xl p-5 flex justify-center items-center mb-5 shadow-lg"
            >
              <ColorPicker bind:value={colorInput} on:change={(e) => updateColor(e.detail.value)} />
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
            value={colorInput}
            class="text-center font-semibold text-xl bg-transparent focus:outline-none w-full min-w-0"
            on:blur={(e) => onColorInput(e)}
            on:keyup={(e) => e.key === 'Enter' && onColorInput(e)}
          />
        </div>
      </div>
      <div class="ml-10 text-lg w-80">
        <Fieldset label="Color Spaces">
          <ColorSpace label="HEX" value={colorInstance.hex()} />
          <ColorSpace label="RGB" value={colorInstance.rgb().join(', ')} />
          <ColorSpace label="HSL" value={colorInstance.hsl()} />
          <ColorSpace label="HSV" value={colorInstance.hsv()} />
          <ColorSpace label="HSI" value={colorInstance.hsi()} />
          <ColorSpace label="LCH" value={colorInstance.lch()} />
          <ColorSpace label="LAB" value={colorInstance.lab()} />
          <ColorSpace label="Numeric RGB" value={colorInstance.num()} />
          <ColorSpace label="Temperature" value={colorInstance.temperature()} />
          <ColorSpace label="GL" value={colorInstance.gl()} />
        </Fieldset>
      </div>
      <div class="w-80 ml-10">
        <Fieldset label="CSS Values">
          <ColorSpace label="RGB" value={new TinyColor(colorInstance.hex()).toString('rgb')} />
          <ColorSpace
            label="Percent RGB"
            value={new TinyColor(colorInstance.hex()).toString('prgb')}
          />
          <ColorSpace label="HSL" value={new TinyColor(colorInstance.hex()).toString('hsl')} />
          <ColorSpace label="HSV" value={new TinyColor(colorInstance.hex()).toString('hsv')} />
        </Fieldset>
    
          <div class="mt-10">
            <Fieldset label="Inspiration">
              <div class="flex flex-col space-y-2">
                <a
                  class="text-lg"
                  href="https://dribbble.com/shots/popular?color={colorInstance.hex().replace('#', '')}&timeframe=ever"
                  target="_blank">Dribble</a
                >
                <a
                  class="text-lg"
                  href="https://www.behance.net/search/projects?color_hex={colorInstance.hex().replace('#', '')}"
                  target="_blank">Behance</a
                >
              </div>
            </Fieldset>
          </div>

          <div class="mt-10">
            <Fieldset label="Images">
              <a
                class="text-lg"
                href="https://www.pexels.com/search/%20/?color={colorInstance.hex().replace('#', '')}"
                target="_blank">Pexels</a
              >
            </Fieldset>
          </div>
      </div>

      <!-- <div class="w-80 ml-10">
        <Fieldset label="Color Combinations">
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Analogous</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).analogous() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Monochromatic</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).monochromatic() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Splitcomplement</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).splitcomplement() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Triad</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).triad() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Tetrad</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).tetrad() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Polyad</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).polyad() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Complement</h6>
            <div class="flex space-x-2">
              <ColorBlock color={new TinyColor(colorInstance.hex()).complement().toHexString()} />
            </div>
          </div>
          
        </Fieldset>
      </div> -->
    </div>
    
      <div class="mt-16 w-full">
        <Fieldset label="Color Combinations">
    
          <div class="flex space-x-4">
            <div class="flex-1">
              <h6 class="text-base font-medium mb-3">Analogous</h6>
              <div class="flex flex-col space-y-2">
                {#each new TinyColor(colorInstance.hex()).analogous() as color}
                  <ColorBlock color={color.toHexString()} expands />
                {/each}
              </div>
            </div>
            <div class="flex-1">
              <h6 class="text-base font-medium mb-3">Monochromatic</h6>
              <div class="flex flex-col space-y-2">
                {#each new TinyColor(colorInstance.hex()).monochromatic() as color}
                  <ColorBlock color={color.toHexString()} expands />
                {/each}
              </div>
            </div>
            <div class="flex-1">
              <h6 class="text-base font-medium mb-3">Splitcomplement</h6>
              <div class="flex flex-col space-y-2">
                {#each new TinyColor(colorInstance.hex()).splitcomplement() as color}
                  <ColorBlock color={color.toHexString()} expands />
                {/each}
              </div>
            </div>
            <div class="flex-1">
              <h6 class="text-base font-medium mb-3">Triad</h6>
              <div class="flex flex-col space-y-2">
                {#each new TinyColor(colorInstance.hex()).triad() as color}
                  <ColorBlock color={color.toHexString()} expands />
                {/each}
              </div>
            </div>
            <div class="flex-1">
              <h6 class="text-base font-medium mb-3">Tetrad</h6>
              <div class="flex flex-col space-y-2">
                {#each new TinyColor(colorInstance.hex()).tetrad() as color}
                  <ColorBlock color={color.toHexString()} expands />
                {/each}
              </div>
            </div>
            <div class="flex-1">
              <h6 class="text-base font-medium mb-3">Polyad</h6>
              <div class="flex flex-col space-y-2">
                {#each new TinyColor(colorInstance.hex()).polyad(6) as color}
                  <ColorBlock color={color.toHexString()} expands />
                {/each}
              </div>
            </div>
            <div class="flex-1">
              <h6 class="text-base font-bold mb-3">Complement</h6>
              <div class="flex space-x-2">
                <ColorBlock color={new TinyColor(colorInstance.hex()).complement().toHexString()} expands />
              </div>
            </div>
          </div>
          
        </Fieldset>
      </div>
  </div>
</div>
