import type { Config } from 'tailwindcss'

// En Tailwind v4 los tokens van en globals.css con @theme {}
// Este archivo solo se usa para content paths
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
}

export default config
