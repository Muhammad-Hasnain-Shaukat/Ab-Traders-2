/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F4EF',
          50: '#FCFBF9',
          100: '#F7F4EF',
          200: '#EFEAE2',
          300: '#E4DDD0',
        },
        beige: {
          DEFAULT: '#E8E0D5',
          light: '#F3EFE9',
          dark: '#D5C9BA',
        },
        taupe: {
          DEFAULT: '#B4A38B',
          light: '#C7BAA5',
          dark: '#938169',
        },
        gold: {
          DEFAULT: '#AD8B59',
          light: '#C4A470',
          dark: '#8C6C3B',
          muted: '#C1A87E',
        },
        charcoal: {
          DEFAULT: '#24211C',
          50: '#F6F5F4',
          100: '#ECEAE8',
          200: '#D5D1CE',
          400: '#7B756E',
          600: '#4D4740',
          700: '#3A352F',
          800: '#2A2621',
          900: '#24211C',
          950: '#171512',
        },
        deepbrown: '#332A20',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(36, 33, 28, 0.05), 0 2px 6px -1px rgba(36, 33, 28, 0.03)',
        'soft-hover': '0 10px 30px -4px rgba(36, 33, 28, 0.08), 0 4px 10px -2px rgba(36, 33, 28, 0.04)',
        'warm': '0 8px 30px rgba(173, 139, 89, 0.08)',
      },
    },
  },
  plugins: [],
}
