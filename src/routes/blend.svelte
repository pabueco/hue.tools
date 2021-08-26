<script lang="ts">
import ColorBlock from '$src/components/ColorBlock.svelte';

	import ColorCard from '$src/components/ColorCard.svelte';

	import Field from '$src/components/Field.svelte';

	import Fieldset from '$src/components/Fieldset.svelte';
	import { Color } from '$src/models/Color';
	import { primaryColor } from '$src/store';
	import { getColorsFromUrl, updateQuery } from '$src/utils/url';
	import * as blend from 'color-blend';

	let modes = [
		{ id: 'normal', name: 'normal' },
		{ id: 'multiply', name: 'multiply' },
		{ id: 'screen', name: 'screen' },
		{ id: 'overlay', name: 'overlay' },
		{ id: 'darken', name: 'darken' },
		{ id: 'lighten', name: 'lighten' },
		{ id: 'colorDodge', name: 'color dodge' },
		{ id: 'colorBurn', name: 'color burn' },
		{ id: 'hardLight', name: 'hard light' },
		{ id: 'softLight', name: 'soft light' },
		{ id: 'difference', name: 'difference' },
		{ id: 'exclusion', name: 'exclusion' },
		{ id: 'hue', name: 'hue' },
		{ id: 'saturation', name: 'saturation' },
		{ id: 'color', name: 'color' },
		{ id: 'luminosity', name: 'luminosity' }
	];

	let mode = 'normal';

	let colorInstances: Color[] = getColorsFromUrl() || [Color.random(0.5), Color.random(0.5)];

	$: resultColor = new Color(blend[mode](...colorInstances.map((c) => c.tinycolor.toRgb())));

	$: $primaryColor = resultColor;

	$primaryColor = resultColor;

	const removeColor = (index: number) => {
		colorInstances = colorInstances.filter((_, i) => i !== index);
		onColorChange();
	};

	const onColorChange = () => {
		updateQuery(
			'colors',
			colorInstances.map((c) => c.toString('hex8')).filter((v) => !!v)
		);
	};

	onColorChange();
</script>

<svelte:head>
	<title>hue.tools – blend</title>
</svelte:head>

<div class="flex-1 container mx-auto max-w-6xl flex flex-col">
	<Fieldset label="Blend Mode">
		<Field hoverable={false}>
			<div class="flex flex-wrap gap-x-5 gap-y-2">
				{#each modes as m}
					<button
						class="uppercase font-medium tracking-wider transition text-xl {mode === m.id
							? 'text-primary-clamped'
							: ''}"
						on:click={() => (mode = m.id)}
					>
						{m.name}
					</button>
				{/each}
			</div>
		</Field>
	</Fieldset>

	<div class="flex flex-col lg:flex-row gap-10 mt-12 flex-1">
		<div class="flex-1 flex flex-col">
			<h2 class="font-bold text-2xl mb-6">Your colors</h2>
			<div class="flex-1 flex flex-col space-y-4">
				{#each colorInstances as colorInstance, index (index)}
					<div class="flex-1 flex flex-col">
						<ColorCard
							deletable={colorInstances.length > 2}
							bind:color={colorInstance}
							on:delete={() => removeColor(index)}
							on:change={onColorChange}
							hasTransparency
						/>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col flex-1">
			<h2 class="font-bold text-2xl mb-6">Result</h2>
			<ColorBlock color={resultColor} expands alwaysShowColor size="lg" className="rounded-2xl min-h-[100px]">
        <a on:click|stopPropagation={() => {}} href="/info?color={resultColor.hex().replace('#', '')}" class="absolute bottom-4 right-4 opacity-70 transition hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
      </ColorBlock>
		</div>
	</div>
</div>
