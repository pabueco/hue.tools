<script lang="ts">
  import { copyToClipboard } from "../utils/clipboard";

  export let label: string;
  export let value: string | number | Number[] = undefined;

  $: formattedValue = Array.isArray(value) ? value.map(v => isNaN(Number(v)) ? 0.00 : v.toFixed(2)).join(', ') : value

</script>

<div class="flex flex-col mb-3 last:mb-0">
  <div class="mr-2 font-medium text-gray-400 w-16 text-base tracking-wider whitespace-nowrap">
    {label}
  </div>
  <div class="tabular-nums text-xl font-medium cursor-pointer text-gray-100 hover:text-primary-clamped transition" on:click={() => copyToClipboard(formattedValue)}>
    <slot>{formattedValue}</slot>
  </div>
</div>