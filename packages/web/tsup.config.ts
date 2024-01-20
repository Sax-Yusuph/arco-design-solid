import { defineConfig } from 'tsup-preset-solid'

export default defineConfig(
  [
    {
      name: 'lib',
      entry: './components/index.tsx',
      devEntry: true,
    },
    {
      name: 'icon',
      entry: './icon/arco-icons/index.ts',
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
