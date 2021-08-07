<script lang="ts">
	export const ssr = false;

	import chroma, { scale } from 'chroma-js';
	// import iro from '@jaames/iro';
	import { onMount } from 'svelte';
	import { TinyColor, mostReadable } from '@ctrl/tinycolor';

	import ColorPicker from '../components/ColorPicker.svelte';
	import { copyToClipboard } from '../utils/clipboard';
	import { primaryColor } from '../store';
	import ColorCard from '$src/components/ColorCard.svelte';
  import Fieldset from '$src/components/Fieldset.svelte';
  import ColorSpace from '$src/components/ColorSpace.svelte';

	let colorInstances: chroma.Color[] = [chroma.random(), chroma.random()];

	let stepsCount = 10;

	let showStepsAsGradient = false;

	$: colorSteps = chroma.scale(colorInstances).mode('lch').colors(stepsCount);
	$: colorStepsText = colorSteps.map((i) => mostReadable(i, ['#fff', '#000']).toHexString());

	$: averageColor = chroma.average(colorInstances, 'lch');
	$: averageColorText = mostReadable(averageColor.hex(), ['#fff', '#000']).toHexString();

	$: $primaryColor = averageColor;

	$: gradient = colorSteps.join(', ');

	const removeColor = (index: number) => {
		colorInstances = colorInstances.filter((_, i) => i !== index);
	};
	const addColor = () => {
		const color = chroma.random();
		colorInstances.push(color);
		colorInstances = colorInstances;
	};

	const decreaseStepCount = () => {
		if (stepsCount > colorInstances.length) {
			stepsCount--;
		}
	};
	const increaseStepCount = () => {
		if (stepsCount < 50) {
			stepsCount++;
		}
	};
</script>

<div class="flex-1 container mx-auto max-w-6xl flex flex-col">
  <div class="flex justify-center space-x-12 flex-1">
    <div class="flex flex-col flex-1">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-bold text-2xl">Your colors</h2>

        <button on:click={addColor} class="h-8 w-8 border border-white hover:border-primary-clamped hover:text-primary-clamped rounded-full flex items-center justify-center">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
  
      <div class="flex-1 flex flex-col space-y-4">
        {#each colorInstances as colorInstance, index (index)}
          <div class="flex-1 flex flex-col">
            <ColorCard
              deletable={colorInstances.length > 2}
              bind:color={colorInstance}
              on:delete={() => removeColor(index)}
            />
          </div>
        {/each}

      </div>
    </div>
  
    <div class="flex flex-col flex-1">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-bold text-2xl">Steps</h2>

        <div class="flex items-center">
          <div class="flex justify-between">
            <button on:click={decreaseStepCount} class="hover:text-primary-clamped">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
              </svg>
            </button>
            <div class="tabular-nums w-8">
              <input
                type="text"
                class="bg-transparent w-full text-center focus:outline-none text-lg"
                bind:value={stepsCount}
                min={colorInstances.length}
                max="50"
              />
            </div>
            <button on:click={increaseStepCount} class="hover:text-primary-clamped">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
    
          <button
            on:click={() => (showStepsAsGradient = !showStepsAsGradient)}
            style="color: {!showStepsAsGradient ? 'var(--color-primary)' : 'currentColor'}"
            class="ml-5"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      
  
      {#if showStepsAsGradient}
        <div class="h-full rounded-2xl" style="background: linear-gradient(to bottom, {gradient});" />
      {:else}
        <div class="flex-1 flex flex-col space-y-3">
          {#each colorSteps as colorStep, index (index)}
            <div
              style="background-color: {colorStep}"
              class="flex-1 w-full rounded-2xl cursor-pointer flex items-center justify-center group"
              on:click={() => copyToClipboard(colorStep)}
            >
              <span
                style="color: {colorStepsText[index]}"
                class="font-semibold text-lg opacity-0 transform scale-75 group-hover:opacity-100 group-hover:scale-100 transition"
                >{colorStep}</span
              >
            </div>
          {/each}
        </div>
      {/if}
    </div>
  
    <div class="flex flex-col flex-1">
      <h2 class="font-bold text-2xl mb-6">Mixed</h2>
      <div
        style="background-color: {averageColor}"
        class="flex-1 rounded-2xl flex items-center justify-center cursor-pointer"
        on:click={() => copyToClipboard(averageColor.hex())}
      >
        <span style="color: {averageColorText}" class="font-semibold text-xl">{averageColor}</span>
      </div>
    </div>
  </div>

  <div class="mt-16">
    <Fieldset label="CSS">
      <ColorSpace label="Linear Gradient" value="linear-gradient(to bottom, {colorInstances.map(c => c.hex()).join(', ')})" />
    </Fieldset>
  </div>
</div>
