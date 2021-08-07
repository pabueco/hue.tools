<script>
  import "../app.postcss"

  import { SvelteToast } from '@zerodevx/svelte-toast'

  import { page } from '$app/stores';
  import { complementColor, primaryColor, primaryColorClamped } from "../store";

</script>

<SvelteToast options={{ reversed: true, dismissable: false }} />

<div class="min-h-screen flex flex-col p-6" style="--color-primary: {$primaryColor}; --color-primary-clamped: {$primaryColorClamped}; --color-complement: {$complementColor}">
	<!-- <div
		class="absolute inset-0 opacity-50"
		style="background: linear-gradient(to right, {gradient});"
	/> -->

	<div class="fixed inset-0" style="background: {$primaryColor.hex()};" />

  <div class="bg-gray-900 rounded-2xl mb-3 relative z-10 text-white">
    <div
			class="px-10 py-6 flex justify-center items-center relative"
		>
			<h1 class="text-3xl font-medium absolute left-10 text-primary-clamped">hue.tools</h1>

			<div class="flex items-center space-x-4 text-xl font-medium">
				<a href="/" class="{$page.path === '/' ? 'text-primary-clamped' : ''}">Mix</a>
				<a href="/info" class="{$page.path === '/info' ? 'text-primary-clamped' : ''}">Info</a>
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