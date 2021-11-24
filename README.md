# hue.tools

hue.tools is web app that helps you to work with colors.

Try it out: [hue.tools](https://hue.tools)

## Features

- Mix
  - Mix multiple colors and generate as many shades/steps between those colors as you want
  - Switch the interpolation mode to change the way the colors are mixed
- Blend
  - Mix two colors using one of the 16 blend modes (multiply, color burn, soft light, exclusion, etc.)
  - Change the alpha channel to make tiny adjustments
- Info
  - Convert a color to many different color spaces and formats
  - Links to resources/stock images using the same color on platforms like Dribble, Behance and Pexels 
  - Color combinations/harmonies like Triad, Analogous, Polyad
  - Complementary color
  - Name of the color using a [curated list of color names](https://www.npmjs.com/package/color-name-list)
- Modify
  - Adjust a color by combining 8 different modifiers
  - Available modifiers: Brighten, Darken, Tint, Shade, Desaturate, Saturate, Lighten and Spin

Tip: Change to output format on the top right to get exactly the color format/space you need when copying colors.

## Tech

- [Typescript](https://www.typescriptlang.org/)
- [Svelte](https://svelte.dev)
- [SvelteKit](https://kit.svelte.dev)
- [Tailwind.css](https://tailwindcss.com/)

Most of the color realted features in hue.tools are powered by [chroma.js](https://gka.github.io/chroma.js/) and [tinycolor](https://www.npmjs.com/package/@ctrl/tinycolor).

## Contributing

Contributions are always welcome!

## Development

```bash
# Install dependencies.
yarn

# Start the dev server and open the app in a new browser tab.
yarn dev --open
```
