/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '5px 10px 15px rgba(123, 184, 123, 0.25)',
      },
      fontFamily: {
        jaldi: ['Jaldi'],
      },
      borderWidth: {
        1: '1px',
      },
      width: {
        half_with_padding: 'calc(50% - 4px)',
      },
      screens: {
        xs: { max: '768px' },
        laptopish_max: { min: '1080px' },
        pc_min: { min: '1427px' },
      },
    },
  },

  plugins: [],
};
