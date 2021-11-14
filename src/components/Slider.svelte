<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import noUiSlider from 'nouislider';
	import 'nouislider/dist/nouislider.min.css';

	let slider;
	const dispatch = createEventDispatcher();

	export let start = 0;
	export let connect = 'lower' as boolean | 'lower' | 'upper' | boolean[];
	export let margin = 0;
	export let limit = null;
	export let padding = 0;
	export let step = 1;
	export let orientation = 'horizontal' as 'horizontal' | 'vertical';
	export let direction = 'ltr' as 'ltr' | 'rtl';
	export let tooltips = false;
	export let animate = true;
	export let animationDuration = 300;
	export let keyboardSupport = true;
	export let range = {
		min: 0,
		max: 100
	};
	export let behaviour = 'tap';

	export const set = (value) => slider.noUiSlider.set(value);
	export const getApi = () => slider.noUiSlider;

	onMount(() => {
		noUiSlider.create(slider, {
			start,
			connect,
			margin,
			limit,
			padding,
			step,
			orientation,
			direction,
			tooltips,
			animate,
			animationDuration,
			keyboardSupport,
			behaviour,
			range
		});
		slider.noUiSlider.on('update', (values, handle, unencoded, tap, positions) =>
			dispatch('update', { values, handle, unencoded, tap, positions })
		);
		slider.noUiSlider.on('slide', (values, handle, unencoded, tap, positions) =>
			dispatch('slide', { values, handle, unencoded, tap, positions })
		);
	});
</script>

<div class="slider" bind:this={slider} />

<style>
	:global(.noUi-connect) {
		@apply bg-primary-clamped;
	}
	:global(.noUi-target) {
		@apply bg-gray-700 border-none border-opacity-75 shadow-none bg-opacity-50 h-2.5 rounded-full;
	}
	:global(.noUi-handle) {
		@apply h-6 w-6 rounded-full bg-primary-clamped shadow-none border-gray-900 border-4 top-[-8px] transition !important;
	}
	:global(.noUi-handle[aria-valuenow='0.0']) {
		@apply bg-gray-400 !important;
	}
	:global(.noUi-handle::before),
	:global(.noUi-handle::after) {
		@apply hidden;
	}
</style>
