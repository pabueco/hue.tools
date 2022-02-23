<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import Fieldset from './Fieldset.svelte'

  import Slider from './Slider.svelte'

  export let name
  export let value: number
  export let unit = '%' as string | null
  export let sliderProps = {}

  let slider

  const onInput = (event) => {
    const newValue = parseInt(event.target.value)
    value = newValue
    slider.set(newValue)
  }

  const dispatch = createEventDispatcher()
</script>

<Fieldset label={name}>
  <div class="flex justify-between">
    <div>
      <div class="dark:text-gray-400 text-gray-500">
        <slot name="description" />
      </div>
    </div>

    <div class="flex items-end -mt-2.5">
      <input
        class="tabular-nums text-[1.6rem] leading-none font-normal font-mono bg-transparent border-none inline-block w-20 text-right mr-1 focus:outline-none relative top-[-1px]"
        {value}
        on:input={onInput}
      />
      {#if unit}
        <span class="text-gray-400 text-lg">{unit}</span>
      {/if}
    </div>
  </div>
  <div class="mt-4">
    <Slider
      bind:this={slider}
      slot="slider"
      start={value}
      on:slide={(e) => (value = parseInt(e.detail.values))}
      {...sliderProps}
      on:change={(e) => dispatch('change', e.detail)}
    />
  </div>
</Fieldset>
