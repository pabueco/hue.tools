<script lang="ts">
  export let label: string
  export let className: string = ''
</script>

<div
  class="border rounded-xl dark:border-gray-700 border-gray-300 p-6 pt-7 relative {className}"
>
  <h5
    class="absolute left-3 top-0 transform -translate-y-1/2 dark:bg-gray-900 bg-white px-3 text-lg font-bold transition duration-300"
  >
    {label}
  </h5>

  <slot />
</div>
