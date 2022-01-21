<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';

	import ColorBlock from '$src/components/ColorBlock.svelte';
	import ColorCard from '$src/components/ColorCard.svelte';
	import Modifier from '$src/components/Modifier.svelte';
	import { Color } from '$src/models/Color';
	import { primaryColor } from '$src/store';
	import { getColorFromUrl, updateQuery } from '$src/utils/url';

	let queryColor = getColorFromUrl();
	let initialFormat = queryColor ? queryColor?.tinycolor?.format : 'hex8';

	let colorInstance: Color = queryColor || Color.random();

	$: $primaryColor = colorInstance;

	const onColorChange = () => {
		updateQuery('color', colorInstance.toString(initialFormat));
	};

	onColorChange();

  const modifiers = {
    brighten: 0,
    darken: 0,
    tint: 0,
    shade: 0,
    saturate: 0,
    desaturate: 0,
    lighten: 0,
    spin: 0
  }

  const query = new URLSearchParams($page.url.search);
  for (const key in modifiers) {
    modifiers[key] = Number(query.get(key) || 0)
  }

	$: finalColor = Color.fromTinyColor(
		colorInstance.tinycolor
			.brighten(modifiers.brighten)
			.darken(modifiers.darken)
			.tint(modifiers.tint)
			.shade(modifiers.shade)
			.saturate(modifiers.saturate)
			.desaturate(modifiers.desaturate)
			.lighten(modifiers.lighten)
			.spin(modifiers.spin)
	);

	const onChange = () => {
		const query = new URLSearchParams($page.url.search);

    for (const [key, value] of Object.entries(modifiers)) {
      query.set(key, value.toString());
    }

		goto('?' + query.toString(), {
			keepfocus: true,
			replaceState: true,
			noscroll: true
		});
	};
</script>

<svelte:head>
	<title>hue.tools – modify</title>
</svelte:head>

<div class="flex flex-col xl:grid grid-cols-4 gap-10 container mx-auto">
	<div class="flex flex-col order-1">
		<h2 class="font-bold text-2xl mb-6">Your colors</h2>
		<ColorCard
			deletable={false}
			{initialFormat}
			bind:color={colorInstance}
			on:change={onColorChange}
		/>
	</div>

	<div class="col-span-2 my-10 xl:my-0 order-last xl:order-2">
		<h2 class="font-bold text-2xl mb-6">Modifiers</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5 gap-y-8">
			<Modifier name="Brighten" bind:value={modifiers.brighten} on:change={onChange}>
				<div slot="description">Increase the brightness</div>
			</Modifier>
			<Modifier name="Darken" bind:value={modifiers.darken} on:change={onChange}>
				<div slot="description">Decrease the brightness</div>
			</Modifier>
			<Modifier name="Tint" bind:value={modifiers.tint} on:change={onChange}>
				<div slot="description">Mix with pure white</div>
			</Modifier>
			<Modifier name="Shade" bind:value={modifiers.shade} on:change={onChange}>
				<div slot="description">Mix with pure black</div>
			</Modifier>
			<Modifier name="Desaturate" bind:value={modifiers.desaturate} on:change={onChange}>
				<div slot="description">Decrease the saturation</div>
			</Modifier>
			<Modifier name="Saturate" bind:value={modifiers.saturate} on:change={onChange}>
				<div slot="description">Increase the saturation</div>
			</Modifier>
			<Modifier name="Lighten" bind:value={modifiers.lighten} on:change={onChange}>
				<div slot="description">Increase the luminance</div>
			</Modifier>
			<Modifier
				name="Spin"
				bind:value={modifiers.spin}
				on:change={onChange}
				sliderProps={{ range: { min: -360, max: 360 }, connect: false }}
				unit="°"
			>
				<div slot="description">Spin the hue</div>
			</Modifier>
		</div>
	</div>

	<div class="flex flex-col order-3">
		<h2 class="font-bold text-2xl mb-6">Result</h2>
		<ColorBlock
			color={finalColor}
			expands
			alwaysShowColor
			size="lg"
			className="rounded-2xl min-h-[150px]"
			showName
		>
			<a
				on:click|stopPropagation={() => {}}
				href="/info?color={finalColor.hex().replace('#', '')}"
				class="absolute bottom-4 right-4 opacity-70 transition hover:opacity-100"
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
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</a>
		</ColorBlock>
	</div>
</div>
