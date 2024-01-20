export const createIconContext = () => {
  return `
		import { createContext, useContext } from 'solid-js'

		export const IconContext = createContext({
			prefixCls: 'arco',
		})

		export const useIconContext = () => useContext(IconContext)

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
	import { JSX, mergeProps, splitProps } from 'solid-js'
	import { useIconContext } from '../context';

   function ${componentName}(baseProps: IconProps): JSX.Element {
		const { prefixCls = 'arco' } = useIconContext()
		const addPrefix = (str: string) => prefixCls + str


		const combined = mergeProps(baseProps, {
			'aria-hidden': true,
			focusable: false,
			class: [
				baseProps.class ? baseProps.class : '',
				addPrefix('-icon'),
				addPrefix('-icon-${name.replace('-icon', '')}'),
				baseProps.spin ? addPrefix('-icon-loading') : '',
			].join(' '),
		})

		const [_, props] = splitProps(combined, ['spin'])

		return ${svgHtml.replace('{...props}=""', '{...props}')}

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
