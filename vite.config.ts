import { configDefaults, defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'src/{app,main}.tsx',
        'src/vite-env.d.ts',
        'src/**/*.interfaces.ts',
        '*.config.js'
      ],
    }
  }
})
