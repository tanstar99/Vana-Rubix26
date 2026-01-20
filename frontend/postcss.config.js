export default {
  plugins: {
    '@tailwindcss/postcss': {},  /* <--- This is the change that fixes the error */
    autoprefixer: {},
  },
}