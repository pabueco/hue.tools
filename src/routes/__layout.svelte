<script>
  import "../app.postcss"

  import { SvelteToast } from '@zerodevx/svelte-toast'

  import { page } from '$app/stores';
  import { currentColor } from "../store";
import { TinyColor } from "@ctrl/tinycolor";

</script>

<SvelteToast options={{ reversed: true, dismissable: false }} />

<div class="min-h-screen flex flex-col p-6" style="--color-current: {$currentColor}; --color-complement: {new TinyColor($currentColor).complement().toHexString()}">
	<!-- <div
		class="absolute inset-0 opacity-50"
		style="background: linear-gradient(to right, {gradient});"
	/> -->

	<div class="fixed inset-0" style="background: {$currentColor};" />

  <div class="bg-gray-900 rounded-2xl mb-3 relative z-10 text-white">
    <div
			class="px-10 py-6 flex justify-center items-center relative"
		>
			<h1 class="text-3xl font-medium absolute left-10" style="color: {$currentColor}">hue.tools</h1>

			<div class="flex items-center space-x-4 text-xl font-medium">
				<a href="/" class="{$page.path === '/' ? 'text-curr' : ''}">Mix</a>
				<a href="/info" class="{$page.path === '/info' ? 'text-curr' : ''}">Info</a>
			</div>

		</div>
  </div>

	<div class="flex-1 flex flex-col relative z-10 bg-gray-900 text-white rounded-2xl shadow-lg p-10">
		<slot></slot>
	</div>
</div>