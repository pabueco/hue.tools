<script lang="ts">
	export const ssr = false;

	import { TinyColor } from '@ctrl/tinycolor';
	import ColorSpace from '../components/ColorSpace.svelte';
	import Fieldset from '../components/Fieldset.svelte';
	import ColorBlock from '../components/ColorBlock.svelte';
	import { outputFormat, primaryColor } from '../store';
	import ColorCard from '$components/ColorCard.svelte';
	import { getColorFromUrl, updateQuery } from '$src/utils/url';
	import { Color } from '$src/models/Color';
import { copyToClipboard } from '$src/utils/clipboard';

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

  $: colorCombinations = [
    {
      label: 'Analogous',
      colors: combiAnalogous
    },
    {
      label: 'Monochromatic',
      colors: combiMonochromatic
    },
    {
      label: 'Splitcomponent',
      colors: combiSplitcomplement
    },
    {
      label: 'Triad',
      colors: combiTriad
    },
    {
      label: 'Tetrad',
      colors: combiTetrad
    },
    {
      label: 'Polyad',
      colors: combiPolyad
    },
  ]
</script>

<svelte:head>
	<title>hue.tools – info</title>
</svelte:head>

<div class="flex flex-col items-center">
	<div class="container mx-auto max-w-6xl">
		<div class="flex flex-col lg:flex-row gap-10">
			<div class="flex-1 flex flex-col lg:w-[300px] xl:w-[420px] lg:flex-initial">
				<ColorCard bind:color={colorInstance} {initialFormat} on:change={onColorChange} />
			</div>
			<div class="flex-1 flex gap-8 md:gap-6 flex-col sm:flex-row">
        <div class="text-lg flex-1">
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
        <div class="flex-1 flex flex-col gap-8">
          <Fieldset label="CSS Values">
            <ColorSpace label="RGB" value={new TinyColor(colorInstance.hex()).toString('rgb')} />
            <ColorSpace
              label="Percent RGB"
              value={new TinyColor(colorInstance.hex()).toString('prgb')}
            />
            <ColorSpace label="HSL" value={new TinyColor(colorInstance.hex()).toString('hsl')} />
            <ColorSpace label="HSV" value={new TinyColor(colorInstance.hex()).toString('hsv')} />
          </Fieldset>
  
          <div class="">
            <Fieldset label="Inspiration">
              <div class="flex flex-col space-y-3">
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
  
          <div class="flex-1">
            <Fieldset label="Images" className="h-full">
              <div class="flex flex-col space-y-3">
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
      </div>
		</div>

		<div class="mt-14 w-full">
			<Fieldset label="Color Combinations">
				<div class="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex xl:gap-5">
          {#each colorCombinations as combination, index (index) }
            <div class="flex-1">
              <div class="flex items-center justify-between mb-3">
                <h6 class="text-lg md:text-base font-medium">{combination.label}</h6>

                <button
                  on:click={(e) => copyToClipboard(e, combination.colors.map(c => c.toString($outputFormat)).join('\n'))}
                  class="opacity-40 transition hover:text-primary-clamped hover:opacity-100 ml-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex flex-col space-y-2">
                {#each combination.colors as color}
                  <ColorBlock {color} expands size="sm" className="rounded-xl" />
                {/each}
              </div>
            </div>
          {/each}
				</div>
			</Fieldset>
		</div>
	</div>

  <div class="flex-1">
    <h6 class="text-lg md:text-base font-bold mb-3">Complement</h6>
    <div class="flex space-x-2">
      <ColorBlock color={colorComplement} expands size="sm" className="rounded-xl" />
    </div>
  </div>
</div>

