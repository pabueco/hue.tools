<script lang="ts">
  export const ssr = false

  import chroma, { InterpolationMode } from 'chroma-js'

  import { outputFormat, primaryColor } from '../store'
  import ColorCard from '$src/components/ColorCard.svelte'
  import Fieldset from '$src/components/Fieldset.svelte'
  import ColorSpace from '$src/components/ColorSpace.svelte'
  import { getColorsFromUrl, getQueryParam, updateQuery } from '$src/utils/url'
  import Field from '$src/components/Field.svelte'
  import { Color } from '$src/models/Color'
  import ColorBlock from '$src/components/ColorBlock.svelte'
  import { copyToClipboard } from '$src/utils/clipboard'
  import Slider from '$src/components/Slider.svelte'
  import { clamp } from 'lodash-es'

  let queryColors = getColorsFromUrl()

  let colorInstances: Color[] = queryColors || [Color.random(), Color.random()]

  const gammaDefault = 1
  let gamma = Number(getQueryParam('gamma')) || gammaDefault

  let stepsCount =
    Number(getQueryParam('steps', localStorage.getItem('steps'))) || 10

  $: if (stepsCount) {
    updateQuery('steps', stepsCount.toString())
  }

  let showStepsAsGradient = getQueryParam('view') === 'gradient'

  $: updateQuery('view', showStepsAsGradient ? 'gradient' : 'steps')

  let mode: InterpolationMode = (getQueryParam('mode') ||
    localStorage.getItem('mode') ||
    'lch') as InterpolationMode

  $: if (mode) {
    updateQuery('mode', mode)
  }

  $: localStorage.setItem('mode', mode)
  $: localStorage.setItem('steps', stepsCount.toString())

  let modes = ['lch', 'hsl', 'lab', 'rgb', 'lrgb'] as InterpolationMode[]

  $: colorSteps = chroma
    .scale(colorInstances.map((c) => c.hex()))
    .gamma(gamma)
    .mode(mode)
    .colors(stepsCount)
    .map((c) => new Color(c))

  $: averageColor = Color.fromChroma(
    chroma.average(
      colorInstances.map((c) => c.chroma),
      mode
    )
  )

  $: $primaryColor = averageColor

  $: gradient = colorSteps.join(', ')

  $: colorList = colorSteps.map((c) => c.toString($outputFormat)).join('\n')

  const removeColor = (index: number) => {
    colorInstances = colorInstances.filter((_, i) => i !== index)
    onColorChange()
  }
  const addColor = () => {
    const color = Color.random()
    colorInstances.push(color)
    colorInstances = colorInstances
    if (stepsCount < colorInstances.length) {
      stepsCount = colorInstances.length
    }
    onColorChange()
  }

  const decreaseStepCount = () => {
    if (stepsCount > colorInstances.length) {
      stepsCount--
    }
  }
  const increaseStepCount = () => {
    if (stepsCount < 50) {
      stepsCount++
    }
  }

  const onColorChange = () => {
    updateQuery(
      'colors',
      colorInstances.map((c) => c.toString('hex8')).filter((v) => !!v)
    )
  }

  const gammaRange = {
    min: 0.3,
    max: 3,
  }

  let gammaSlider: Slider
  const updateGamma = (value: string | number) => {
    gamma = clamp(Number(value) || 1, gammaRange.min, gammaRange.max)
    gammaSlider.set(gamma)
  }
  const onGammaInput = (event) => {
    updateGamma((event.target as HTMLInputElement).value)
  }
  const resetGamma = () => {
    updateGamma(gammaDefault)
  }

  onColorChange()
</script>

<svelte:head>
  <title>hue.tools – mix</title>
</svelte:head>

<div class="flex-1 container mx-auto max-w-6xl flex flex-col">
  <div class="flex flex-col lg:flex-row justify-center gap-12 flex-1">
    <div class="flex flex-col flex-1 order-1">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-bold text-2xl">Your colors</h2>

        <button
          on:click={addColor}
          class="h-8 w-8 border border-white hover:border-primary-clamped hover:text-primary-clamped rounded-full flex items-center justify-center"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      <div class="flex-1 flex flex-col space-y-4">
        {#each colorInstances as colorInstance, index (index)}
          <div class="flex-1 flex flex-col">
            <ColorCard
              deletable={colorInstances.length > 2}
              bind:color={colorInstance}
              on:delete={() => removeColor(index)}
              on:change={onColorChange}
            />
          </div>
        {/each}
      </div>
    </div>

    <div class="flex flex-col flex-1 order-3 lg:order-2">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-2">
          <h2 class="font-bold text-2xl">Steps</h2>
        </div>

        <div class="flex items-center">
          <div class="flex justify-between">
            <button
              on:click={decreaseStepCount}
              class="transition hover:text-primary-clamped"
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
                  d="M18 12H6"
                />
              </svg>
            </button>
            <div class="tabular-nums w-8">
              <input
                type="text"
                class="bg-transparent w-full text-center focus:outline-none text-lg"
                bind:value={stepsCount}
                min={colorInstances.length}
                max="50"
              />
            </div>
            <button
              on:click={increaseStepCount}
              class="transition hover:text-primary-clamped"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>

          <button
            on:click={() => (showStepsAsGradient = !showStepsAsGradient)}
            class="ml-5 transition {!showStepsAsGradient
              ? 'text-primary-clamped'
              : ''}"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>

          <button
            on:click={(e) => copyToClipboard(e, colorList, 'Colors copied!')}
            class="transition hover:text-primary-clamped ml-5"
            title="Copy all shades/steps"
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {#if showStepsAsGradient}
        <div
          class="h-full rounded-2xl"
          style="background: linear-gradient(to bottom, {gradient});"
        />
      {:else}
        <div class="flex-1 flex flex-col space-y-3">
          {#each colorSteps as colorStep, index (index)}
            <ColorBlock color={colorStep} expands className="rounded-xl" />
          {/each}
        </div>
      {/if}
    </div>

    <div class="flex flex-col flex-1 order-2 lg:order-3">
      <h2 class="font-bold text-2xl mb-6">Mixed</h2>
      <ColorBlock
        color={averageColor}
        expands
        alwaysShowColor
        size="lg"
        className="rounded-2xl min-h-[150px]"
        showName
      >
        <a
          on:click|stopPropagation={() => {}}
          href="/info?color={averageColor.hex().replace('#', '')}"
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

  <div class="mt-16">
    <Fieldset label="Settings">
      <div class="grid lg:grid-cols-2 gap-8">
        <Field label="Interpolation Mode" hoverable={false}>
          <div class="flex flex-wrap gap-x-3.5 md:gap-x-5 mt-2">
            {#each modes as type}
              <button
                class="uppercase font-medium tracking-wider transition text-xl {mode ===
                type
                  ? 'text-primary-clamped'
                  : ''}"
                on:click={() => (mode = type)}
              >
                {type}
              </button>
            {/each}
          </div>
        </Field>
        <Field label="Gamma Correction" hoverable={false}>
          <div class="mt-4">
            <Slider
              bind:this={gammaSlider}
              start={gamma}
              on:slide={(e) => (gamma = parseFloat(e.detail.values))}
              on:change={() => updateQuery('gamma', gamma.toString())}
              range={gammaRange}
              step={0.01}
            />
          </div>

          <div slot="actions" class="flex items-center space-x-2">
            {#if gamma !== gammaDefault}
              <button
                on:click={resetGamma}
                class="transition dark:text-gray-500 text-gray-400 hover:text-primary-clamped"
                title="Reset gamma"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            {/if}

            <input
              class="font-mono text-right bg-transparent w-[4ch] focus:outline-none"
              value={gamma.toFixed(2)}
              on:input={onGammaInput}
            />
          </div>
        </Field>
      </div>
    </Fieldset>
  </div>

  <div class="mt-10">
    <Fieldset label="CSS">
      <ColorSpace
        label="Linear Gradient"
        value="linear-gradient(to bottom, {colorInstances
          .map((c) => c.hex())
          .join(', ')})"
      />
    </Fieldset>
  </div>
</div>
