import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

export default {
  content: ['./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [nextui()],
  darkMode: 'class',
} satisfies Config
