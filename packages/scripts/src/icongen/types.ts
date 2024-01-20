import { JSX } from 'solid-js'
export type SVGSVGElementTags = JSX.SVGElementTags['svg']

export interface IconTree {
  a: SVGSVGElementTags
  c: string
}

export type IconContextType = {
  prefixCls: string
}

export interface IconProps extends SVGSVGElementTags {
  spin?: boolean
  title?: string
  style?: JSX.CSSProperties
}

export interface IconBaseProps extends IconProps {
  src: IconTree
}

export declare type IconTypes = (props: IconProps) => JSX.Element
