<script lang="ts">
  import { copyToClipboard } from "../utils/clipboard";

  export let color: string;
  export let expands: boolean = false;

</script>

<div style="background: {color}" class="rounded-xl h-10 cursor-pointer {expands ? 'w-full' : 'w-10'}" on:click={() => copyToClipboard(color)}>
  
</div>