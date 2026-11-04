/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          paper: '#E2D3BA',
          'paper-light': '#FFFFFF',
          'paper-card': '#F3EBDD',
          'paper-deep': '#D8C7A5',
          header: '#F9F4E8',
          outer: '#15171C',
          ink: '#3B2B1D',
          brown: '#745C42',
          'brown-dark': '#5F4A38',
          bronze: '#8F6E4A',
          sepia: '#5F4A38',
          line: '#D8CCB8',
          muted: '#796857',
          brass: '#B88A38',
          'brass-light': '#D4AF37',
          cinnabar: '#98281A',
          'cinnabar-dark': '#7A1D12',
          forest: '#142820',
          'forest-dark': '#0D1C16',
        },
        paper: {
          DEFAULT: '#FAF7F0',
          light: '#FFFFFF',
          card: '#F3EBDD',
          warm: '#F3EFE6',
          muted: '#E8E1D3',
          border: '#D8CCB8',
          footer: '#E2D3BA',
        },
        forest: {
          DEFAULT: '#142820',
          dark: '#0D1C16',
          deep: '#07110D',
          light: '#1B382D',
          muted: '#24483B',
        },
        brass: {
          DEFAULT: '#B88A38',
          light: '#D4AF37',
          dark: '#8F6E4A',
          subtle: '#E2CFA8',
        },
        charcoal: {
          DEFAULT: '#3B2B1D',
          light: '#554231',
          muted: '#796857',
        },
        ink: {
          DEFAULT: '#3B2B1D',
          light: '#554231',
          muted: '#796857',
        },
        terracotta: {
          DEFAULT: '#98281A',
          dark: '#7A1D12',
          light: '#B94D35',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        xs: '1px',
        sm: '2px',
        DEFAULT: '2px',
      },
      letterSpacing: {
        editorial: '0.18em',
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}
