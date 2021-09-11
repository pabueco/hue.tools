<script lang="ts">
	import type { Color } from '$src/models/Color';
	import { outputFormat } from '$src/store';
	import { nearest } from '$src/utils/colors';
	import throttle from 'lodash/throttle';

	import { copyToClipboard } from '../utils/clipboard';

	export let color: Color;
	export let expands: boolean = false;
	export let animatesOnHover: boolean = false;
	export let animatesOnClick: boolean = false;
	export let alwaysShowColor: boolean = false;
	export let className: string = '';
	export let size: string = 'default';
	export let showName: boolean = false;

	let textColor = undefined;

	$: if (alwaysShowColor) {
		textColor = color.textColor();
	}

	let colorName;

	const findColorNameThrottled = throttle(() => {
		colorName = nearest(color.toString('hex')).name;
	}, 400);

	$: if (showName && color) {
		findColorNameThrottled();
	}
</script>

<div
	style="background: {color.hex()}; color: {textColor}"
	class="group relative min-h-[2.5rem] cursor-pointer transition duration-200 flex items-center justify-center select-none whitespace-nowrap {expands
		? 'w-full flex-1'
		: 'w-10'} {animatesOnHover ? 'transform hover:scale-110' : ''} {animatesOnClick
		? 'active:scale-90'
		: ''} {className} {size === 'sm' ? 'text-sm' : ''} {size === 'lg' ? 'text-lg' : ''}"
	on:click={(e) => copyToClipboard(e, color.toString($outputFormat))}
	on:mouseenter={() => (!alwaysShowColor ? (textColor = color.textColor()) : null)}
>
	{#if showName && colorName}
		<div
			class="absolute top-4 text-lg font-medium opacity-80 transition hover:opacity-100 left-1/2 transform -translate-x-1/2 text-center"
			style="color: {textColor};"
			on:click={(e) => copyToClipboard(e, colorName)}
		>
			{colorName}
		</div>
	{/if}

	<span
		class="{!alwaysShowColor
			? 'opacity-0 scale-75'
			: ''} transform group-hover:opacity-100 group-hover:scale-100 font-medium"
		style="transition: opacity 150ms, transform 150ms;">{color.toString($outputFormat)}</span
	>

	<slot />
</div>
