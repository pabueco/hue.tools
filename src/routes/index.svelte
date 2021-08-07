<script lang="ts">
	export const ssr = false;

	import chroma, { scale } from 'chroma-js';
	// import iro from '@jaames/iro';
	import { onMount } from 'svelte';
	import { TinyColor, mostReadable } from '@ctrl/tinycolor';

	import ColorPicker from '../components/ColorPicker.svelte';
  import { copyToClipboard } from '../utils/clipboard';
  import { currentColor } from '../store';
  
	let colorInputs: string[] = [chroma.random().hex(), chroma.random().hex()];

	let colorInstances: chroma.Color[] = [];

	// let colorPicker: iro.ColorPicker

	let colorPickerVisibleFor: number;

	let stepsCount = 10;

	let showStepsAsGradient = false;

	$: validColorInputs = colorInputs.filter((i) => chroma.valid(i));

	$: colorInstances = validColorInputs
		.map((i) => i && chroma.valid(i) && chroma(i))
		.filter((v) => !!v);

	$: colorSteps = chroma.scale(colorInstances).mode('lch').colors(stepsCount);
	$: colorStepsText = colorSteps.map((i) => mostReadable(i, ['#fff', '#000']).toHexString());

	$: averageColor = chroma.average(validColorInputs, 'lch');
	$: averageColorText = mostReadable(averageColor.hex(), ['#fff', '#000']).toHexString();
	$: averageColorComplement = new TinyColor(averageColor.hex()).complement().toHexString();

	$: averageColorClamped = averageColor.luminance(0.5).saturate(2.5);

  $: $currentColor = averageColor.hex()

	$: gradient = colorSteps.join(', ');

	$: textColors = validColorInputs.map((i) => mostReadable(i, ['#fff', '#000']).toHexString());

	const removeColor = (index) => {
		colorInputs = colorInputs.filter((_, i) => i !== index);
		// colorPicker.removeColor(index)
	};
	const addColor = () => {
		const color = chroma.random().hex();
		colorInputs.push(color);
		colorInputs = colorInputs;
		// colorPicker.addColor(color)
	};

	// onMount(() => {
	//   // @ts-ignore
	//   colorPicker = new iro.ColorPicker('#picker', {
	//     colors: colorInputs
	//   });

	//   colorPicker.on('color:change', function(color: iro.Color) {
	//     colorInputs[color.index] = color.hexString
	//   });
	// })

	const onColorInput = (index, event) => {
		colorInputs[index] = event.target.value;
	};

	const toggleColorPickerFor = (index) => {
		colorPickerVisibleFor = colorPickerVisibleFor === index ? null : index;
	};
</script>

<!-- <div class="min-h-screen flex flex-col p-6" style="--color-primary: {averageColorClamped}; --color-complement: {averageColorComplement}">

	<div class="absolute inset-0" style="background: {averageColor};" />

  <div class="bg-gray-900 rounded-2xl mb-3 relative z-10 text-white">
    <div
			class="px-10 py-6 flex justify-center items-center relative"
		>
			<h1 class="text-3xl font-medium absolute left-10" style="color: {averageColorClamped};">hue.tools</h1>

			<div class="flex items-center space-x-4 text-lg">
				<div>Mix</div>
				<div>Convert</div>
			</div>

		</div>
  </div> -->

	<!-- <div class="flex-1 flex flex-col relative z-10 bg-gray-900 text-white rounded-2xl shadow-lg"> -->
		<div class="flex justify-center space-x-12 flex-1">
			<div class="flex flex-col w-80">
				<h2 class="font-bold text-2xl mb-6">Your colors</h2>

				<!-- {#each colorInstances as colorInstance, index (index)}
          <div
            class="relative bg-gray-800 bg-opacity-50 border-2 border-gray-700 border-opacity-50 hover:border-opacity-75 transition rounded-2xl shadow-lg hover:shadow-xl p-6 flex flex-col items-center"
          >
            <button
              class="absolute top-3 right-3 block text-white opacity-25 hover:opacity-75 transition"
              on:click={() => removeColor(index)}
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
  
            <div
              style="background-color: {colorInstance.hex?.()}; box-shadow: 0 10px 30px -10px {colorInstance
                .alpha(0.75)
                .css()}"
              class="block h-32 w-32 hover:rounded-[35%] rounded-[25%] mb-3 cursor-pointer transition-all"
              on:click={() => toggleColorPickerFor(index)}
            />
            <input
              type="text"
              value={colorInputs[index]}
              class="text-white text-center bg-transparent focus:outline-none text-xl w-full min-w-0"
              on:blur={(e) => onColorInput(index, e)}
              on:keyup={e=>e.key==='Enter' && onColorInput(index, e)}
            />
  
            {#if colorPickerVisibleFor[index]}
              <ColorPicker bind:value={colorInputs[index]} />
            {/if}
          </div>
        {/each} -->

				<div class="flex-1 flex flex-col space-y-4">
					{#each colorInstances as colorInstance, index (index)}
						<div class="flex-1 flex flex-col">
							<div
								style="color: {textColors[
									index
								]}; background-color: {colorInstance.hex?.()}; box-shadow: 0 10px 30px -10px {colorInstance
									.alpha(0.75)
									.css()}"
								class="relative transition rounded-2xl p-4 flex-1 flex flex-col justify-end"
							>
								{#if colorInputs.length > 2}
									<button
										class="absolute top-3 right-3 block opacity-40 hover:opacity-100 transition"
										on:click={() => removeColor(index)}
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

								<!-- <div class="bg-black text-white bg-opacity-75 rounded-lg shadow-lg p-4 flex items-center justify-center relative">
                <button class="absolute left-4 top-1/2 transform -translate-y-1/2" on:click={() => toggleColorPickerFor(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </button>
                <input type="text" value={colorInputs[index]} class="text-white text-center bg-transparent focus:outline-none text-xl w-full min-w-0" on:blur={(e) => onColorInput(index, e)}>
              </div> -->

								{#if colorPickerVisibleFor === index}
									<div
										class="bg-black text-white bg-opacity-75 rounded-xl p-5 flex justify-center items-center mb-5 shadow-lg mt-20"
									>
										<ColorPicker bind:value={colorInputs[index]} />
									</div>
								{/if}

								<button
									class="absolute left-5 bottom-5"
									on:click={() => toggleColorPickerFor(index)}
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
									value={colorInputs[index]}
									class="text-center font-semibold text-xl bg-transparent focus:outline-none w-full min-w-0"
									on:blur={(e) => onColorInput(index, e)}
									on:keyup={e => e.key === 'Enter' && onColorInput(index, e)}
								/>
							</div>
						</div>
					{/each}

					<button
						on:click={addColor}
						class="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white"
					>
						Add
					</button>
				</div>
			</div>

			<div class="flex flex-col w-80">
				<h2 class="font-bold text-2xl mb-6">Steps between</h2>

				<div class="flex mb-5 items-center justify-between px-4">
					<div class="flex justify-between">
						<button on:click={() => stepsCount--} class="hover:text-curr">
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
									d="M18 12H6"
								/>
							</svg>
						</button>
						<div class="tabular-nums w-10">
							<input
								type="text"
								class="bg-transparent w-full text-center focus:outline-none text-lg"
								bind:value={stepsCount}
							/>
						</div>
						<button on:click={() => stepsCount++} class="hover:text-curr">
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

				{#if showStepsAsGradient}
					<div
						class="h-full rounded-2xl"
						style="background: linear-gradient(to bottom, {gradient});"
					/>
				{:else}
					<div class="flex-1 flex flex-col space-y-3">
						{#each colorSteps as colorStep, index (index)}
							<div style="background-color: {colorStep}" class="flex-1 w-full rounded-2xl cursor-pointer flex items-center justify-center group" on:click={() => copyToClipboard(colorStep)}>
                <span style="color: {colorStepsText[index]}" class="font-semibold text-lg opacity-0 transform scale-75 group-hover:opacity-100 group-hover:scale-100 transition">{colorStep}</span>
              </div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="flex flex-col w-64">
				<h2 class="font-bold text-2xl mb-6">Average color</h2>
				<div
					style="background-color: {averageColor}"
					class="flex-1 rounded-2xl flex items-center justify-center cursor-pointer"
          on:click={() => copyToClipboard(averageColor.hex())}
				>
					<span style="color: {averageColorText}" class="font-semibold text-xl">{averageColor}</span
					>
				</div>
			</div>
		</div>
	<!-- </div> -->
<!-- </div> -->

<style>
  ::selection {
    background: var(--color-complement);
    color: var(--color-current);
  }
</style>