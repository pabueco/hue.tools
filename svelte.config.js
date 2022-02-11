import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: vercel(),

    prerender: {
      enabled: false,
    },

    vite: {
      resolve: {
        alias: {
          $src: resolve('./src'),
          $components: resolve('./src/components'),
        },
      },
    },
  },
}

export default config
