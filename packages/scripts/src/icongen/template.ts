export const createIconContext = () => {
  return `
		import { createContext, useContext } from 'solid-js'

		export const IconContext = createContext({
			prefixCls: 'arco',
		})

		export const useIconContext = () => useContext(IconContext)


		type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined
		type ClassDictionary = Record<string, any>
		type ClassArray = ClassValue[]

		export function cs(...args: ClassValue[]) {
			var i = 0,
				tmp,
				str = '',
				len = args.length
			for (; i < len; i++) {
				if ((tmp = args[i])) {
					if (typeof tmp === 'string') {
						str += (str && ' ') + tmp
					}
				}
			}
			return str
		}


	`
}

export const getIcon = ({
  name,
  componentName,
  svgHtml,
}: {
  name: string
  componentName: string
  svgHtml: string
}) => {
  return `
	import type { IconProps } from '../types'
	import { splitProps, Component} from 'solid-js'
	import { useIconContext, cs } from '../context';

   const ${componentName}: Component<IconProps> = (baseProps: IconProps) => {
		const { prefixCls = 'arco' } = useIconContext()
		const prefix = prefixCls + '-icon'

		const [_, props] = splitProps(baseProps, ['spin'])

		return ${svgHtml.replace(
      '>',
      `{...props} class={
			cs(baseProps.class,prefix,
			\`\${prefix}-${name.replace('icon-', '')}\`,
			{ [\`\${prefix}-loading\`]: baseProps.spin }
			)}>`,
    )}
	}

	export default ${componentName}
		`
}

export const getType = ({ exports }: { exports: string[] }) => {
  return `
	import { JSX, Component, Context,useContext } from 'solid-js'

	type IconContextType = {
		prefixCls?: string;
	}

	export declare const IconContext: Context<IconContextType>;
	export declare const useIconContext: ()=>typeof useContext<IconContextType>;


	export interface IconProps extends  JSX.SvgSVGAttributes<SVGSVGElement> {
		spin?: boolean
		style?: JSX.CSSProperties
	}

	${exports.map(item => `${' '.repeat(4)}${item}`).join('\n')}
`
}

export const getComponentIndex = ({
  name,
  componentName,
}: {
  name: string
  componentName: string
}) => {
  // language=TypeScript
  // prettier-ignore
  return `
export {default as ${componentName}} from './${name}';
`
}

export const getIndex = ({ exports }: { exports: string[] }) =>
  // language=TypeScript
  // prettier-ignore
  `${exports.join('\n')}
	`
