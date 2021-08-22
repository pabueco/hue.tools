<script lang="ts">
	export const ssr = false;

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
	import { Color } from '$src/models/Color';

	let queryColor = getColorFromUrl();

	let colorInstance: Color = queryColor || Color.random();
	let initialFormat = queryColor ? queryColor?.tinycolor?.format : 'hex8';

	const onColorChange = () => {
		updateQuery('color', new TinyColor(colorInstance?.hex()).toString(initialFormat));
	};

	$: $primaryColor = colorInstance;

	$primaryColor = colorInstance;

	onColorChange();

	$: combiAnalogous = new TinyColor(colorInstance.hex())
		.analogous()
		.map((c) => Color.fromTinyColor(c));
	$: combiMonochromatic = new TinyColor(colorInstance.hex())
		.monochromatic()
		.map((c) => Color.fromTinyColor(c));
	$: combiSplitcomplement = new TinyColor(colorInstance.hex())
		.splitcomplement()
		.map((c) => Color.fromTinyColor(c));
	$: combiTriad = new TinyColor(colorInstance.hex()).triad().map((c) => Color.fromTinyColor(c));
	$: combiTetrad = new TinyColor(colorInstance.hex()).tetrad().map((c) => Color.fromTinyColor(c));
	$: combiPolyad = new TinyColor(colorInstance.hex()).polyad(6).map((c) => Color.fromTinyColor(c));
	$: colorComplement = Color.fromTinyColor(new TinyColor(colorInstance.hex()).complement());
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
					<ColorSpace label="HEX" value={colorInstance.chroma.hex()} />
					<ColorSpace label="RGB" value={colorInstance.chroma.rgb().join(', ')} />
					<ColorSpace label="HSL" value={colorInstance.chroma.hsl()} />
					<ColorSpace label="HSV" value={colorInstance.chroma.hsv()} />
					<ColorSpace label="HSI" value={colorInstance.chroma.hsi()} />
					<ColorSpace label="LCH" value={colorInstance.chroma.lch()} />
					<ColorSpace label="LAB" value={colorInstance.chroma.lab()} />
					<ColorSpace label="Numeric RGB" value={colorInstance.chroma.num()} />
					<ColorSpace label="Temperature" value={colorInstance.chroma.temperature()} />
					<ColorSpace label="GL" value={colorInstance.chroma.gl()} />
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
								class="text-lg flex items-center"
								href="https://dribbble.com/shots/popular?color={colorInstance
									.hex()
									.replace('#', '')}&timeframe=ever"
								target="_blank"
							>
								<img
									src="https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico"
									class="h-5 mr-2.5"
									alt=""
								/>
								Dribble
							</a>
							<a
								class="text-lg flex items-center"
								href="https://www.behance.net/search/projects?color_hex={colorInstance
									.hex()
									.replace('#', '')}"
								target="_blank"
							>
								<img
									src="https://a5.behance.net/8dac56884dc995cee3717be798eec3e8f86a501c/img/site/favicon.ico?cb=264615658"
									class="h-5 mr-2.5 rounded"
									alt=""
								/>
								Behance
							</a>
							<a
								class="text-lg flex items-center"
								href="https://www.designspiration.com/color/{colorInstance
									.hex()
									.replace('#', '')}"
								target="_blank"
							>
								<img
									src="https://s.dspncdn.com/a1/webapp/img/favicons/favicon-32x32.png"
									class="h-5 mr-2.5 rounded"
									alt=""
								/>
								Designspiration
							</a>
						</div>
					</Fieldset>
				</div>

				<div class="mt-10">
					<Fieldset label="Images">
						<div class="flex flex-col space-y-2">
              <a
                class="text-lg flex items-center"
                href="https://www.pexels.com/search/%20/?color={colorInstance.hex().replace('#', '')}"
                target="_blank"
              >
                <img src="https://www.pexels.com/favicon.ico" class="h-6 mr-2.5 rounded" alt="" />
                Pexels
              </a>
              <a
                class="text-lg flex items-center"
                href="http://labs.tineye.com/multicolr/#colors={colorInstance.hex().replace('#', '')}"
                target="_blank"
              >
                <img src="http://labs.tineye.com/favicon.ico" class="h-5 mr-2.5 rounded" alt="" />
                TinEye Search Engine
              </a>
            </div>
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

		<div class="mt-12 w-full">
			<Fieldset label="Color Combinations">
				<div class="flex space-x-4">
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Analogous</h6>
						<div class="flex flex-col space-y-2">
							{#each combiAnalogous as color}
								<ColorBlock {color} expands className="rounded-xl" />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Monochromatic</h6>
						<div class="flex flex-col space-y-2">
							{#each combiMonochromatic as color}
								<ColorBlock {color} expands className="rounded-xl" />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Splitcomplement</h6>
						<div class="flex flex-col space-y-2">
							{#each combiSplitcomplement as color}
								<ColorBlock {color} expands className="rounded-xl" />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Triad</h6>
						<div class="flex flex-col space-y-2">
							{#each combiTriad as color}
								<ColorBlock {color} expands className="rounded-xl" />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Tetrad</h6>
						<div class="flex flex-col space-y-2">
							{#each combiTetrad as color}
								<ColorBlock {color} expands className="rounded-xl" />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-medium mb-3">Polyad</h6>
						<div class="flex flex-col space-y-2">
							{#each combiPolyad as color}
								<ColorBlock {color} expands className="rounded-xl" />
							{/each}
						</div>
					</div>
					<div class="flex-1">
						<h6 class="text-base font-bold mb-3">Complement</h6>
						<div class="flex space-x-2">
							<ColorBlock color={colorComplement} expands className="rounded-xl" />
						</div>
					</div>
				</div>
			</Fieldset>
		</div>
	</div>
</div>
