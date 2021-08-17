<script>
  export const ssr = false;

  import "../app.postcss"

  import { SvelteToast } from '@zerodevx/svelte-toast'

  import { page } from '$app/stores';
  import { browser, dev } from '$app/env';
  import { complementColor, outputFormat, primaryColor, primaryColorClamped } from "../store";
  import { onMount } from "svelte";
  
  onMount(() => {
    $outputFormat = localStorage.getItem('format') || 'hex'
  })

  $: if (browser && localStorage && $outputFormat) {
    localStorage.setItem('format', $outputFormat)
  }

</script>

<svelte:head>
  {#if !dev}
    <script defer data-domain="hue.tools" src="https://plausible.io/js/plausible.js"></script>
  {/if}
</svelte:head>

<SvelteToast options={{ reversed: true, dismissable: false }} />

<div class="min-h-screen flex flex-col p-6" style="--color-primary: {$primaryColor}; --color-primary-clamped: {$primaryColorClamped}; --color-complement: {$complementColor}">
	<!-- <div
		class="absolute inset-0 opacity-50"
		style="background: linear-gradient(to right, {gradient});"
	/> -->

	<div class="fixed inset-0" style="background: {$primaryColor?.hex()};" />

  <div class="bg-gray-900 rounded-2xl mb-3 relative z-10 text-white">
    <div
			class="px-10 py-6 flex justify-center items-center relative"
		>
			<div class="absolute left-10 flex items-center">
        <a href="/" class="text-3xl font-medium text-primary-clamped">hue.tools</a>
        <button on:click={() => location.search = ''} class="ml-5 hover:text-primary-clamped transition hover:animate-spin-reverse">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

			<div class="flex items-center space-x-4 text-xl font-medium">
				<a href="/" class="{$page.path === '/' ? 'text-primary-clamped' : ''}">Mix</a>
				<a href="/info" class="{$page.path === '/info' ? 'text-primary-clamped' : ''}">Info</a>
			</div>

      <div class="absolute right-10 flex items-center">
        <label for="" class="mr-3">Output format:</label>
        <select bind:value={$outputFormat} class="bg-gray-700 transition hover:bg-gray-600 focus:outline-none px-2 py-1 rounded-md cursor-pointer">
          <option value="hex" class="bg-transparent">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
          <option value="hsv">HSV</option>
          <option value="hsi">HSI</option>
          <option value="lab">LAB</option>
        </select>
      </div>

		</div>
  </div>

	<div class="flex-1 flex flex-col relative z-10 bg-gray-900 text-white rounded-2xl shadow-lg p-10">
		<slot></slot>
	</div>
</div>

<style>
	*::selection {
		background: var(--color-complement);
		color: var(--color-primary);
	}
</style>