<script lang="ts">
  export let label: string = null
  export let value: string | number | Number[] = undefined
  export let hoverable: boolean = true

  $: formattedValue = Array.isArray(value)
    ? value.map((v) => (isNaN(Number(v)) ? 0.0 : v.toFixed(2))).join(', ')
    : value
</script>

<div class="flex flex-col mb-3 last:mb-0">
  {#if label || $$slots.actions}
    <div class="flex items-center justify-between">
      {#if label}
        <div
          class="mr-2 font-medium dark:text-gray-400 text-gray-500 w-16 text-base tracking-wider whitespace-nowrap"
        >
          {label}
        </div>
      {/if}

      <slot name="actions" />
    </div>
  {/if}
  <div
    class="tabular-nums text-xl font-medium cursor-pointer dark:text-gray-100 text-gray-600 {hoverable
      ? 'hover:text-primary-clamped'
      : ''} transition"
  >
    <slot>{formattedValue}</slot>
  </div>
</div>
