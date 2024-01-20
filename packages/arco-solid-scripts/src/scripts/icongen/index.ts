import fs from 'fs-extra'
import { globSync } from 'glob'
import { JSDOM } from 'jsdom'
import path from 'path'
import { optimize } from 'svgo'
import { toKebabCase, toPascalCase } from '../utils/convert-case'
import paths from '../utils/paths'
import svgoConfig from './svgo.config'
import { createIconContext, getIcon, getIndex, getType } from './template'

interface IconData {
  title: string
  type: string
  list: Array<{
    name: string
    componentName: string
    path: string
  }>
}

const root = process.cwd()

const maps = {
  direction: 'Direction indicator',
  tips: 'Prompt suggestion',
  'interactive-button': 'Interactive button',
  edit: 'Editable',
  media: 'Media',
  logo: 'Logo',
  general: 'General',
}

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

function getSVGData(): IconData[] {
  const data: IconData[] = []
  getKeys(maps).forEach(key => {
    const iconData: IconData = {
      title: maps[key],
      type: key,
      list: [],
    }

    const files = globSync(`${toKebabCase(key)}/**/*.svg`, {
      cwd: paths.iconSvgs,
      absolute: true,
    })
    for (const filePath of files) {
      const name = `icon-${path.basename(filePath, '.svg')}`
      iconData.list.push({
        name,
        componentName: `${toPascalCase(name)}`,
        path: filePath,
      })
    }
    data.push(iconData)
  })

  return data
}

async function buildIconComponent(data: IconData[]) {
  await fs.emptyDir(path.resolve(root, 'components/icon'))

  const context = createIconContext()

  fs.outputFile(path.resolve(paths.iconComponents, `context.tsx`), context, err => {
    if (err) {
      console.log(`Build Icon context Failed: ${err}`)
    } else {
      console.log(`Build Icon context Success!`)
    }
  })

  for (const iconData of data) {
    for (const item of iconData.list) {
      const svgFile = fs.readFileSync(item.path, 'utf8')

      const optimizedSvg = optimize(svgFile, {
        path: item.path,
        ...svgoConfig,
      })

      if ('data' in optimizedSvg) {
        const { data } = optimizedSvg
        const svgElement = JSDOM.fragment(data).firstElementChild
        if (svgElement) {
          fs.outputFile(
            path.resolve(paths.iconComponents, `${item.name}/index.tsx`),
            getIcon({
              name: item.name,
              componentName: item.componentName,
              svgHtml: svgElement.outerHTML,
            }),
            err => {
              if (err) {
                console.log(`Build ${item.componentName} Failed: ${err}`)
              } else {
                console.log(`Build ${item.componentName} Success!`)
              }
            },
          )
        }
      }
    }
  }
}

function buildIndex(data: IconData[]) {
  const imports = []
  const exports = [`export * from './context';`]
  const components = []

  for (const iconData of data) {
    for (const item of iconData.list) {
      components.push(item.componentName)
      imports.push(`import ${item.componentName} from './${item.name}';`)
      exports.push(`export { default as ${item.componentName} } from './${item.name}';`)
    }
  }

  // const arcoContent = getArcoVueIcon({ imports, components })
  const indexContent = getIndex({ exports })

  fs.outputFile(path.resolve(paths.iconComponents, 'index.ts'), indexContent, err => {
    if (err) {
      console.log(`Build Index Failed: ${err}`)
    } else {
      console.log('Build Index Success!')
    }
  })

  fs.outputFile(path.resolve(paths.icon, 'icons.json'), JSON.stringify(data, null, 2), err => {
    if (err) {
      console.log(`Build JSON Failed: ${err}`)
    } else {
      console.log('Build JSON Success!')
    }
  })
}

function buildType(data: IconData[]) {
  const exports = ['']

  for (const iconData of data) {
    for (const item of iconData.list) {
      exports.push(`export declare const ${item.componentName}: Component<IconProps>`)
    }
  }

  const typeContent = getType({ exports })

  fs.outputFile(path.resolve(paths.iconComponents, 'icon-components.ts'), typeContent, err => {
    if (err) {
      console.log(`Build Type Failed: ${err}`)
    } else {
      console.log('Build Type Success!')
    }
  })
}

const icongen = async () => {
  const data = getSVGData()

  await buildIconComponent(data)
  buildIndex(data)
  buildType(data)
}

export default icongen
