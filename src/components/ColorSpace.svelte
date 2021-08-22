<script lang="ts">
  import { copyToClipboard } from "../utils/clipboard";
  import Field from "./Field.svelte";

  export let label: string;
  export let value: string | number | Number[] = undefined;

  $: formattedValue = Array.isArray(value) ? value.map(v => isNaN(Number(v)) ? 0.00 : v.toFixed(2)).join(', ') : value

</script>

<Field label={label}>
  <span on:click={(e) => copyToClipboard(e, formattedValue)}>
    {formattedValue}
  </span>
</Field>