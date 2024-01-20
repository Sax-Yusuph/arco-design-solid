import { Config } from 'svgo'

const options: Config = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'removeStyleElement',
    'removeScriptElement',
    'removeDimensions',
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { fill: 'none' },
          // { focusable: 'false' },
          { stroke: 'currentColor' },
          { 'aria-hidden': 'true' }
        ],
      },
    },
  ],
}

export default options
