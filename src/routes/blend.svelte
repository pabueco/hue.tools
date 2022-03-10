<script lang="ts">
  import ColorBlock from '$src/components/ColorBlock.svelte'

  import ColorCard from '$src/components/ColorCard.svelte'

  import Field from '$src/components/Field.svelte'

  import Fieldset from '$src/components/Fieldset.svelte'
  import { Color } from '$src/models/Color'
  import { primaryColor } from '$src/store'
  import { getColorsFromUrl, getQueryParam, updateQuery } from '$src/utils/url'
  import chroma from 'chroma-js'
  import * as blend from 'color-blend'

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
    { id: 'luminosity', name: 'luminosity' },
  ]

  let mode = getQueryParam('mode', 'normal')

  $: updateQuery('mode', mode)

  let colorInstances: Color[] = getColorsFromUrl() || [
    Color.random(1),
    Color.random(1),
  ]

  // We only use the average color as the primary color for this tool.
  $: averageColor = Color.fromChroma(
    chroma.average(
      colorInstances.map((c) => c.chroma),
      'lch'
    )
  )
  $: $primaryColor = averageColor

  $: blendedColors = modes.map((m) => ({
    mode: m.name,
    color: new Color(
      blend[m.id](...colorInstances.map((c) => c.tinycolor.toRgb()))
    ),
  }))

  const onColorChange = () => {
    updateQuery(
      'colors',
      colorInstances.map((c) => c.toString('hex8')).filter((v) => !!v)
    )
  }

  onColorChange()
</script>

<svelte:head>
  <title>hue.tools – blend</title>
</svelte:head>

<div class="flex-1 container mx-auto flex flex-col">
  <!-- <Fieldset label="Blend Mode">
    <Field hoverable={false}>
      <div class="flex flex-wrap gap-x-5 gap-y-2">
        {#each modes as m}
          <button
            class="uppercase font-medium tracking-wider transition text-xl {mode ===
            m.id
              ? 'text-primary-clamped'
              : ''}"
            on:click={() => (mode = m.id)}
          >
            {m.name}
          </button>
        {/each}
      </div>
    </Field>
  </Fieldset> -->

  <div
    class="flex flex-col 2xl:flex-row space-y-10 2xl:space-y-0 2xl:space-x-10"
  >
    <div class="flex flex-col">
      <h2 class="font-bold text-2xl mb-6">Your colors</h2>
      <div
        class="flex flex-col lg:flex-row space-y-5 lg:space-x-5 lg:space-y-0 flex-1 2xl:flex-col 2xl:space-x-0 2xl:space-y-5"
      >
        {#each colorInstances as colorInstance, index (index)}
          <div class="flex-1 flex flex-col">
            <ColorCard
              deletable={colorInstances.length > 2}
              bind:color={colorInstance}
              on:change={onColorChange}
              hasTransparency
            />
          </div>
        {/each}
      </div>
    </div>

    <div class="flex-1">
      <h2 class="font-bold text-2xl mb-6">Blend modes</h2>
      <div
        class="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
      >
        {#each blendedColors as blendResult, index (index)}
          <div
            class="flex flex-col border dark:border-gray-700 border-gray-300 p-4 rounded-2xl"
          >
            <div class="mb-3 capitalize text-center font-medium">
              {blendResult.mode}
            </div>
            <ColorBlock
              color={blendResult.color}
              expands
              className="rounded-xl min-h-[150px]"
              showNameOnHover
            >
              <a
                on:click|stopPropagation={() => {}}
                title="View color info"
                href="/info?color={blendResult.color
                  .toString('hex8')
                  .replace('#', '')}"
                class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-70 transition hover:!opacity-100"
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
        {/each}
      </div>
    </div>
  </div>
</div>
