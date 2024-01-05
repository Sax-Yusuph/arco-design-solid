import { isObject } from '../../utils/is'
import { lighten } from '../../utils/lighten'
import { getKeys } from '../../utils/util'
import { ConfigProviderProps } from './interface'

const colorList = {
  primaryColor: {
    default: '--arcoblue-6',
    hover: '--arcoblue-5',
    active: '--arcoblue-7',
  },
  successColor: {
    default: '--green-6',
    hover: '--green-5',
    active: '--green-7',
  },
  infoColor: {
    default: '--arcoblue-6',
    hover: '--arcoblue-5',
    active: '--arcoblue-7',
  },
  warningColor: {
    default: '--orangered-6',
    hover: '--orangered-5',
    active: '--orangered-7',
  },
  dangerColor: {
    default: '--red-6',
    hover: '--red-5',
    active: '--red-7',
  },
}

export function setTheme(theme: ConfigProviderProps['theme']) {
  if (theme && isObject(theme)) {
    const root = document.body

    const keys = getKeys(colorList)

    keys.forEach(color => {
      if (theme[color]) {
        root.style.setProperty(colorList[color].default, lighten(theme[color], 0))

        if (!theme[`${color}Hover`]) {
          root.style.setProperty(colorList[color].hover, lighten(theme[color], 10))
        }

        if (!theme[`${color}Active`]) {
          root.style.setProperty(colorList[color].active, lighten(theme[color], -10))
        }
      }
    })
  }
}
