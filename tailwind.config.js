module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
    // "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  mode: 'jit',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
