import { defineConfig } from 'tsup-preset-solid'

export default defineConfig(
  [
    {
      entry: 'src/index.tsx',
      devEntry: true,
    },
    {
      name: 'icon',
      entry: 'src/components/icon/index.ts',
      devEntry: true,

    },
  ],
  {
    // Enable this to write export conditions to package.json
    // writePackageJson: true,
    dropConsole: true,
    cjs: true,
  },
)
