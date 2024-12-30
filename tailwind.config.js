/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Scan these files for class names
  ],
  theme: {
    extend: {
      colors: {
        darker: 'var(--c-darker)',
        dark: 'var(--c-dark)',
        normal: 'var(--c-normal)',
        light: 'var(--c-light)',
        "hazy-light": 'var(--c-hazy-light)',
        accent: 'var(--c-accent)',
        danger: 'var(--c-danger)',
      }
    },
  },
  plugins: [],
}

