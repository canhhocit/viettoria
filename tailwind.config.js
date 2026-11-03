/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF7F0',
          warm: '#F3EFE6',
          muted: '#E8E1D3',
          border: '#DCD4C4',
        },
        forest: {
          DEFAULT: '#142820',
          dark: '#0D1C16',
          deep: '#07110D',
          light: '#1B382D',
          muted: '#24483B',
        },
        brass: {
          DEFAULT: '#B88A44',
          light: '#C89C54',
          dark: '#966E2F',
          subtle: '#E2CFA8',
        },
        charcoal: {
          DEFAULT: '#1B1E1B',
          light: '#2E332E',
          muted: '#525952',
        },
        terracotta: {
          DEFAULT: '#9C3D28',
          dark: '#7D2E1D',
          light: '#BA523B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Cinzel', 'serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        xs: '1px',
        sm: '2px',
      },
      letterSpacing: {
        editorial: '0.18em',
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}
