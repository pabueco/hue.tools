<script lang="ts">
	import { copyToClipboard } from '../utils/clipboard';

	export let color: string;
	export let expands: boolean = false;
	export let animatesOnHover: boolean = false;
</script>

<div
	style="background: {color}"
	class="rounded-lg h-10 cursor-pointer transition duration-200 {expands
		? 'w-full'
		: 'w-10'} {animatesOnHover ? 'transform hover:scale-110' : ''} active:scale-90"
	on:click={() => copyToClipboard(color)}
/>
