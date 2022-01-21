const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
      colors: {
        gray: colors.zinc,

        primary: {
          DEFAULT: 'var(--color-primary)',
          clamped: 'var(--color-primary-clamped)',
          complement: 'var(--color-complement)',
          text: 'var(--color-primary-text)',
        },
      },

      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        'spin-reverse': 'spin-reverse 1s linear infinite',
       },

      keyframes: {
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)'
          }
        }
      }
    },
	},
	plugins: [],
};

module.exports = config;
