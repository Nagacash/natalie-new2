/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        purple: 'var(--color-purple)',
        grey: 'var(--color-grey)',
        border: 'var(--color-border)',
        darkmode: 'var(--color-darkmode)',
        'deep-slate': 'var(--color-deep-slate)',
        light: 'var(--color-light)',
        'accent-cyan': 'var(--color-accent-cyan)',
        'accent-cyan-light': 'var(--color-accent-cyan-light)',
        'accent-cyan-dark': 'var(--color-accent-cyan-dark)',
        'accent-blue': 'var(--color-accent-blue)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
      },
      boxShadow: {
        '3xl': '0 50px 100px -20px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
