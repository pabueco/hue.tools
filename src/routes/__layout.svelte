<script lang="ts">
	export const ssr = false;

	import '../app.postcss';

	import { SvelteToast } from '@zerodevx/svelte-toast';

	import { page } from '$app/stores';
	import { browser, dev } from '$app/env';
	import { complementColor, outputFormat, primaryColor, primaryColorClamped } from '../store';
	import { onDestroy, onMount } from 'svelte';
	import { copyToClipboard } from '$src/utils/clipboard';
	import { Color } from '$src/models/Color';

	onMount(() => {
		$outputFormat = localStorage.getItem('format') || 'hex';
	});

	$: if (browser && localStorage && $outputFormat) {
		localStorage.setItem('format', $outputFormat);
	}
</script>

<svelte:head>
	{#if !dev}
		<script defer data-domain="hue.tools" src="https://plausible.io/js/plausible.js"></script>
	{/if}

	<meta
		name="description"
		content="A free color mixer, blender and info tool. Mix multiple colors, get links for design inspiration and stock images based on a color and view various color combinations."
	/>
</svelte:head>

<SvelteToast options={{ reversed: true, dismissable: false }} />

<div
	class="min-h-screen flex flex-col p-4 md:p-6"
	style="--color-primary: {$primaryColor}; --color-primary-clamped: {$primaryColorClamped}; --color-complement: {$complementColor}"
>
	<!-- <div
		class="absolute inset-0 opacity-50"
		style="background: linear-gradient(to right, {gradient});"
	/> -->

	<div class="fixed inset-0" style="background: {$primaryColor?.hex()};" />

	<div class="bg-gray-900 rounded-2xl mb-3 relative z-10 text-white">
		<div class="px-6 md:px-10 py-6 flex flex-col justify-center relative">
			<div
				class="relative md:absolute md:inset-x-10 w-full md:w-auto flex items-center justify-between"
			>
				<div class="flex items-center">
					<a href="/" class="text-2xl md:text-3xl font-medium text-primary-clamped">hue.tools</a>
					<button
						on:click={() => (location.search = '')}
						class="ml-5 hover:text-primary-clamped transition hover:animate-spin-reverse"
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
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					</button>
					<button
						on:click={(e) => copyToClipboard(e, window.location.href)}
						class="ml-5 hover:text-primary-clamped transition"
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
								d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
							/>
						</svg>
					</button>
				</div>

				<div class="flex items-center">
					<label for="" class="mr-3 hidden md:block">Output format:</label>
					<select
						bind:value={$outputFormat}
						class="bg-gray-700 transition hover:bg-gray-600 focus:outline-none px-2 py-1 rounded-md cursor-pointer"
					>
						<option value="hex" class="bg-transparent">HEX</option>
						<option value="rgb">RGB</option>
						<option value="hsl">HSL</option>
						<option value="hsv">HSV</option>
						<option value="hsi">HSI</option>
						<option value="lab">LAB</option>
					</select>
				</div>
			</div>

			<div class="bg-gray-800 block md:hidden h-px my-5 -mx-6" />

			<div
				class="self-center flex items-center justify-center space-x-4 text-xl font-medium order-last flex-basis-[100%] md:order-none relative z-10"
			>
				<a href="/" class={$page.path === '/' ? 'text-primary-clamped' : ''}>Mix</a>
				<a href="/info" class={$page.path === '/info' ? 'text-primary-clamped' : ''}>Info</a>
				<a href="/blend" class={$page.path === '/blend' ? 'text-primary-clamped' : ''}>Blend</a>
			</div>
		</div>
	</div>

	<div
		class="flex-1 flex flex-col relative z-10 bg-gray-900 text-white rounded-2xl shadow-lg p-6 md:p-10 pb-8 md:pb-12"
	>
		<slot />
	</div>

	<div
		class="flex items-center justify-center space-x-4 pt-4 relative z-10"
		style="color: {new Color($complementColor).textColor()}"
	>
		<a href="https://github.com/pabueco/hue.tools" target="_blank">
			<svg
				height="24"
				aria-hidden="true"
				viewBox="0 0 16 16"
				version="1.1"
				width="24"
				data-view-component="true"
        fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
		</a>
		<div>
			<span>Made by</span>
			<a href="https://pabue.co" target="_blank" class="border-b border-current">pabue.co</a>
		</div>
	</div>
</div>

<style>
	*::selection {
		background: var(--color-complement);
		color: var(--color-primary);
	}
</style>
