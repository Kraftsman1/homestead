/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      extend: {
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

