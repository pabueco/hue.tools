import preprocess from 'svelte-preprocess';
import { resolve } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({
    "postcss": true
  })],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    prerender: {
      enabled: false
    },
    ssr: false,

    vite: {
      resolve: {
        alias: {
          $src: resolve('./src'),
          $components: resolve('./src/components'),
        }
      }
    }
  }
};

export default config;
