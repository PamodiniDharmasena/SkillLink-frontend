/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#f5f5f5',
          text: '#333333',
          navbar: '#ffffff',
          sidebar: '#eaeaea',
          input: '#ffffff',
          inputBorder: '#cccccc',
          buttonBg: '#007bff',
          buttonText: '#ffffff',
        },
        dark: {
          bg: '#1e1e1e',
          text: '#e0e0e0',
          navbar: '#2c2c2c',
          sidebar: '#2b2b2b',
          input: '#3c3c3c',
          inputBorder: '#444444',
          buttonBg: '#009688',
          buttonText: '#ffffff',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


