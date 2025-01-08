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
      },
      typography: ({ theme }) => ({
        assistant: {
          css: {
            maxWidth: '200ch',
            '--tw-prose-body': theme('colors.hazy-light'),
            '--tw-prose-headings': theme('colors.light'),
            '--tw-prose-lead': theme('colors.hazy-light'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.light'),
            '--tw-prose-counters': theme('colors.light'),
            '--tw-prose-bullets': theme('colors.light'),
            '--tw-prose-hr': theme('colors.hazy-light'),
            '--tw-prose-quotes': theme('colors.light'),
            '--tw-prose-quote-borders': theme('colors.hazy-light'),
            '--tw-prose-captions': theme('colors.hazy-light'),
            '--tw-prose-code': theme('colors.light'),
            '--tw-prose-pre-code': theme('colors.light'),
            '--tw-prose-pre-bg': theme('colors.darker'),
            '--tw-prose-th-borders': theme('colors.hazy-light'),
            '--tw-prose-td-borders': theme('colors.hazy-light'),
            '--tw-prose-invert-body': theme('colors.hazy-light'),
            '--tw-prose-invert-headings': theme('colors.hazy-light'),
            '--tw-prose-invert-lead': theme('colors.hazy-light'),
            '--tw-prose-invert-links': theme('colors.hazy-light'),
            '--tw-prose-invert-bold': theme('colors.hazy-light'),
            '--tw-prose-invert-counters': theme('colors.hazy-light'),
            '--tw-prose-invert-bullets': theme('colors.hazy-light'),
            '--tw-prose-invert-hr': theme('colors.hazy-light'),
            '--tw-prose-invert-quotes': theme('colors.hazy-light'),
            '--tw-prose-invert-quote-borders': theme('colors.hazy-light'),
            '--tw-prose-invert-captions': theme('colors.hazy-light'),
            '--tw-prose-invert-code': theme('colors.hazy-light'),
            '--tw-prose-invert-pre-code': theme('colors.hazy-light'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.hazy-light'),
            '--tw-prose-invert-td-borders': theme('colors.hazy-light'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

