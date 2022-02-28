<script lang="ts">
  export const ssr = false
  import { Color } from '$src/models/Color'

  import { primaryColor } from '$src/store'
  import { copyToClipboard } from '$src/utils/clipboard'
  // import { slide } from 'svelte/transition';

  $primaryColor = Color.random()

  const tools = ['mix', 'info', 'blend', 'modify']

  const handleMouseEnter = (e) => {
    $primaryColor = Color.random()
  }

  $: colorHex = $primaryColor.toString('hex')
</script>

<svelte:head>
  <title>hue.tools</title>
</svelte:head>

<div class="flex-1 flex flex-col items-center justify-center relative">
  <a
    href="https://www.producthunt.com/posts/hue-tools?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hue-tools"
    target="_blank"
    class="absolute top-0 left-1/2 -translate-x-1/2"
    ><img
      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=331426&theme=light"
      alt="hue.tools - Intuitive open source toolbox for colors. | Product Hunt"
      style="width: 250px; height: 54px;"
      width="250"
      height="54"
    /></a
  >
  <div class="text-center">
    <h1
      class="text-5xl sm:text-7xl md:text-8xl font-bold mb-3 text-primary-clamped transition"
    >
      hue.tools
    </h1>
    <p class="text-base sm:text-xl dark:text-gray-400 text-gray-500">
      An <a
        href="https://github.com/pabueco/hue.tools"
        class="dark:text-gray-300 text-gray-800 hover:text-primary-clamped transition"
        target="_blank">open source</a
      > toolbox for colors.
    </p>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8 sm:mt-14 gap-3 sm:gap-5"
  >
    {#each tools as tool}
      <a
        href={'/' + tool}
        class="transition transform hover:-translate-y-1 bg-white dark:bg-transparent border dark:border-gray-700/60 border-gray-300 shadow dark:shadow-black/50 rounded-lg hover:!bg-primary hover:!text-primary-text hover:!border-primary hover:shadow-xl dark:hover:shadow-black/30 uppercase px-8 py-4 text-center"
        on:mouseenter={handleMouseEnter}
      >
        <span class="font-semibold text-base sm:text-lg tracking-widest"
          >{tool}</span
        >
      </a>
    {/each}
  </div>

  {#key colorHex}
    <div
      on:click={(e) => copyToClipboard(e, colorHex)}
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-primary-clamped font-medium tracking-wide font-mono cursor-pointer text-sm"
    >
      {colorHex}
    </div>
  {/key}
</div>
