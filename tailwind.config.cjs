const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
      colors: {
        gray: colors.trueGray,

        primary: {
          DEFAULT: 'var(--color-primary)',
          clamped: 'var(--color-primary-clamped)',
        }
      },

      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      }
    },
	},
	plugins: [],
};

module.exports = config;
