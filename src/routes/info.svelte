<script lang="ts">
	import chroma from 'chroma-js';
	import { TinyColor } from '@ctrl/tinycolor';
	import ColorSpace from '../components/ColorSpace.svelte';
	import Fieldset from '../components/Fieldset.svelte';
	import ColorBlock from '../components/ColorBlock.svelte';
	import { primaryColor } from '../store';
	import ColorCard from '$components/ColorCard.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
  import { getColorFromUrl, updateQuery } from '$src/utils/url';

	let queryColor = getColorFromUrl();

	let colorInstance: chroma.Color = queryColor?.chroma || chroma.random();
	let initialFormat = queryColor ? queryColor?.tinycolor?.format : 'hex';

	const onColorChange = () => {
		updateQuery('color', new TinyColor(colorInstance?.hex()).toString(initialFormat))
	};

	$: $primaryColor = colorInstance;

	$primaryColor = colorInstance;

  onColorChange()
</script>

<svelte:head>
	<title>hue.tools – info</title>
</svelte:head>

<div class="flex flex-col items-center">
	<div class="container mx-auto max-w-6xl">
		<div class="flex">
			<div class="w-80 flex-1 flex flex-col">
				<ColorCard bind:color={colorInstance} {initialFormat} on:change={onColorChange} />
			</div>
			<div class="ml-10 text-lg w-80">
				<Fieldset label="Color Spaces">
					<ColorSpace label="HEX" value={colorInstance.hex()} />
					<ColorSpace label="RGB" value={colorInstance.rgb().join(', ')} />
					<ColorSpace label="HSL" value={colorInstance.hsl()} />
					<ColorSpace label="HSV" value={colorInstance.hsv()} />
					<ColorSpace label="HSI" value={colorInstance.hsi()} />
					<ColorSpace label="LCH" value={colorInstance.lch()} />
					<ColorSpace label="LAB" value={colorInstance.lab()} />
					<ColorSpace label="Numeric RGB" value={colorInstance.num()} />
					<ColorSpace label="Temperature" value={colorInstance.temperature()} />
					<ColorSpace label="GL" value={colorInstance.gl()} />
				</Fieldset>
			</div>
			<div class="w-80 ml-10">
				<Fieldset label="CSS Values">
					<ColorSpace label="RGB" value={new TinyColor(colorInstance.hex()).toString('rgb')} />
					<ColorSpace
						label="Percent RGB"
						value={new TinyColor(colorInstance.hex()).toString('prgb')}
					/>
					<ColorSpace label="HSL" value={new TinyColor(colorInstance.hex()).toString('hsl')} />
					<ColorSpace label="HSV" value={new TinyColor(colorInstance.hex()).toString('hsv')} />
				</Fieldset>

				<div class="mt-10">
					<Fieldset label="Inspiration">
						<div class="flex flex-col space-y-2">
							<a
								class="text-lg"
								href="https://dribbble.com/shots/popular?color={colorInstance
									.hex()
									.replace('#', '')}&timeframe=ever"
								target="_blank">Dribble</a
							>
							<a
								class="text-lg"
								href="https://www.behance.net/search/projects?color_hex={colorInstance
									.hex()
									.replace('#', '')}"
								target="_blank">Behance</a
							>
						</div>
					</Fieldset>
				</div>

				<div class="mt-10">
					<Fieldset label="Images">
						<a
							class="text-lg"
							href="https://www.pexels.com/search/%20/?color={colorInstance.hex().replace('#', '')}"
							target="_blank">Pexels</a
						>
					</Fieldset>
				</div>
			</div>

			<!-- <div class="w-80 ml-10">
        <Fieldset label="Color Combinations">
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Analogous</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).analogous() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Monochromatic</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).monochromatic() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Splitcomplement</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).splitcomplement() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Triad</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).triad() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Tetrad</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).tetrad() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Polyad</h6>
            <div class="flex space-x-2">
              {#each new TinyColor(colorInstance.hex()).polyad() as color}
                <ColorBlock color={color.toHexString()} />
              {/each}
            </div>
          </div>
  
          <div class="mb-6">
            <h6 class="text-xl font-bold mb-3">Complement</h6>
            <div class="flex space-x-2">
              <ColorBlock color={new TinyColor(colorInstance.hex()).complement().toHexString()} />
            </div>
          </div>
          
        </Fieldset>
      </div> -->
		</div>

		<div class="mt-16 w-full">
			<Fieldset label="Color Combinations">
				<div class="flex space-x-4">
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Analogous</h6>
						<div class="flex flex-col space-y-2">
							{#each new TinyColor(colorInstance.hex()).analogous() as color}
								<ColorBlock color={color.toHexString()} expands />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Monochromatic</h6>
						<div class="flex flex-col space-y-2">
							{#each new TinyColor(colorInstance.hex()).monochromatic() as color}
								<ColorBlock color={color.toHexString()} expands />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Splitcomplement</h6>
						<div class="flex flex-col space-y-2">
							{#each new TinyColor(colorInstance.hex()).splitcomplement() as color}
								<ColorBlock color={color.toHexString()} expands />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Triad</h6>
						<div class="flex flex-col space-y-2">
							{#each new TinyColor(colorInstance.hex()).triad() as color}
								<ColorBlock color={color.toHexString()} expands />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Tetrad</h6>
						<div class="flex flex-col space-y-2">
							{#each new TinyColor(colorInstance.hex()).tetrad() as color}
								<ColorBlock color={color.toHexString()} expands />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Polyad</h6>
						<div class="flex flex-col space-y-2">
							{#each new TinyColor(colorInstance.hex()).polyad(6) as color}
								<ColorBlock color={color.toHexString()} expands />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-bold mb-3">Complement</h6>
						<div class="flex space-x-2">
							<ColorBlock
								color={new TinyColor(colorInstance.hex()).complement().toHexString()}
								expands
							/>
						</div>
					</div>
				</div>
			</Fieldset>
		</div>
	</div>
</div>
