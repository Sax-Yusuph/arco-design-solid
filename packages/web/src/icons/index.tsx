import { JSX } from 'solid-js'
import cs from '../utils/classNames'
export const IconLoading = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon arco-icon-loading')}
    >
      <path
        d="M42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconClose = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon arco-icon-close')}
    >
      <path
        d="M9.85742 9.85791L23.9996 24M23.9996 24L38.1417 38.1422M23.9996 24L38.1417 9.85791M23.9996 24L9.85742 38.1422"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconEye = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon arco-icon-eye')}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 37C30.6274 37 36.6274 32.6667 42 24C36.6274 15.3333 30.6274 11 24 11C17.3726 11 11.3726 15.3333 6 24C11.3726 32.6667 17.3726 37 24 37Z"
        stroke-linecap="butt"
      ></path>
      <path
        d="M29 24C29 26.7614 26.7614 29 24 29C21.2386 29 19 26.7614 19 24C19 21.2386 21.2386 19 24 19C26.7614 19 29 21.2386 29 24Z"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconEyeInvisible = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon arco-icon-eye-invisible')}
    >
      <path
        d="M14 14.5C11.3096 16.5 8.58489 19.8302 6 24C11.3726 32.6667 17.3726 37 24 37C27.3245 37 30.4912 35.9096 33.5 33.7287M17.4635 12.5C19 11 21.7488 11 24 11C30.6274 11 36.6274 15.3333 42 24C40.2344 26.8481 38.4011 29.2282 36.5 31.1404"
        stroke-linecap="butt"
      ></path>
      <path
        d="M29 24C29 26.7614 26.7614 29 24 29C21.2386 29 19 26.7614 19 24C19 21.2386 21.2386 19 24 19C26.7614 19 29 21.2386 29 24Z"
        stroke-linecap="butt"
      ></path>
      <path d="M6.85156 7.10254L41.1462 41.3972" stroke-linecap="butt"></path>
    </svg>
  )
}

export const IconSearch = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        d="M33.0715 33.071C39.3199 26.8226 39.3199 16.692 33.0715 10.4436C26.8231 4.19523 16.6925 4.19523 10.4441 10.4436C4.19572 16.692 4.19572 26.8226 10.4441 33.071C16.6925 39.3194 26.8231 39.3194 33.0715 33.071ZM33.0715 33.071L41.5568 41.5563"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconUp = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        d="M39.5996 30.5566L24.0433 15.0003C24.0433 15.0003 13.1813 25.8622 8.48691 30.5566"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}
export const IconDown = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        d="M39.5996 17.4434L24.0433 32.9997C24.0433 32.9997 13.1813 22.1378 8.48691 17.4434"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}
export const IconPlus = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path d="M5 24H43M24 5L24 43" stroke-linecap="butt"></path>
    </svg>
  )
}
export const IconMinus = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path d="M5 24H43" stroke-linecap="butt"></path>
    </svg>
  )
}

export const IconCheckCircleFill = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM34.2073 19.6214C34.5978 19.2308 34.5978 18.5977 34.2073 18.2071L32.793 16.7929C32.4025 16.4024 31.7694 16.4024 31.3788 16.7929L22.0002 26.1716L17.1215 21.2929C16.7309 20.9024 16.0978 20.9024 15.7073 21.2929L14.293 22.7071C13.9025 23.0977 13.9025 23.7308 14.293 24.1213L21.293 31.1213C21.6836 31.5119 22.3167 31.5119 22.7073 31.1213L34.2073 19.6214Z"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconCheck = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path d="M41.6776 11.0503L19.0502 33.6777L6.32227 20.9498" stroke-linecap="butt"></path>
    </svg>
  )
}

export const IconInfo = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <rect
        x="25"
        y="39"
        width="2"
        height="21"
        transform="rotate(180 25 39)"
        stroke-linecap="butt"
      ></rect>
      <rect
        x="25"
        y="39"
        width="2"
        height="21"
        transform="rotate(180 25 39)"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></rect>
      <rect
        x="25"
        y="11"
        width="2"
        height="2"
        transform="rotate(180 25 11)"
        stroke-linecap="butt"
      ></rect>
      <rect
        x="25"
        y="11"
        width="2"
        height="2"
        transform="rotate(180 25 11)"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></rect>
    </svg>
  )
}

export const IconExclamation = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
			{...props}
      class={cs(props.class, 'arco-icon')}
    >
      <rect x="23" y="9" width="2" height="21" stroke-linecap="butt"></rect>
      <rect
        x="23"
        y="9"
        width="2"
        height="21"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></rect>
      <rect x="23" y="37" width="2" height="2" stroke-linecap="butt"></rect>
      <rect
        x="23"
        y="37"
        width="2"
        height="2"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></rect>
    </svg>
  )
}

export const IconCloseCircleFill = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM28.9547 16.2287L24.005 21.1785L19.0552 16.2287C18.6647 15.8382 18.0315 15.8382 17.641 16.2287L16.2268 17.6429C15.8363 18.0335 15.8363 18.6666 16.2268 19.0571L21.1765 24.0069L16.2268 28.9566C15.8363 29.3472 15.8363 29.9803 16.2268 30.3708L17.641 31.7851C18.0315 32.1756 18.6647 32.1756 19.0552 31.7851L24.005 26.8353L28.9547 31.7851C29.3452 32.1756 29.9784 32.1756 30.3689 31.7851L31.7831 30.3708C32.1737 29.9803 32.1737 29.3472 31.7831 28.9566L26.8334 24.0069L31.7831 19.0571C32.1737 18.6666 32.1737 18.0335 31.7831 17.6429L30.3689 16.2287C29.9784 15.8382 29.3452 15.8382 28.9547 16.2287Z"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconInfoCircleFill = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM26 14C26 13.4477 25.5523 13 25 13H23C22.4477 13 22 13.4477 22 14V16C22 16.5523 22.4477 17 23 17H25C25.5523 17 26 16.5523 26 16V14ZM26 31H27C27.5523 31 28 31.4477 28 32V34C28 34.5523 27.5523 35 27 35H21C20.4477 35 20 34.5523 20 34V32C20 31.4477 20.4477 31 21 31H22V23C21.4477 23 21 22.5523 21 22V20C21 19.4477 21.4477 19 22 19H25C25.5523 19 26 19.4477 26 20V31Z"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconExclamationCircleFill = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM22 33C22 33.5523 22.4477 34 23 34H25C25.5523 34 26 33.5523 26 33V31C26 30.4477 25.5523 30 25 30H23C22.4477 30 22 30.4477 22 31V33ZM26 15C26 14.4477 25.5523 14 25 14H23C22.4477 14 22 14.4477 22 15L22 27C22 27.5523 22.4477 28 23 28H25C25.5523 28 26 27.5523 26 27L26 15Z"
        fill="currentColor"
        stroke="none"
        stroke-width="none"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}

export const IconEmpty = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        d="M24 5V11M31 12L35 8M17 12L13 8M41.5 30L28 30C28 30 27 33 24 33C21 33 20 30 20 30H6.5M40 41H8C6.89543 41 6 40.1046 6 39L6 30.5407C6 30.1866 6.09402 29.8388 6.27244 29.533L12.4212 18.9923C12.7796 18.3778 13.4374 18 14.1487 18H33.8513C34.5626 18 35.2204 18.3778 35.5788 18.9923L41.7276 29.533C41.906 29.8388 42 30.1866 42 30.5407V39C42 40.1046 41.1046 41 40 41Z"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}
export const IconLink = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      {...props}
      class={cs(props.class, 'arco-icon')}
    >
      <path
        d="M14.1006 25.4142L9.15084 30.3639C6.8077 32.7071 6.8077 36.5061 9.15084 38.8492C11.494 41.1924 15.293 41.1924 17.6361 38.8492L26.1214 30.3639C28.4646 28.0208 28.4645 24.2218 26.1214 21.8786M33.8996 22.5858L38.8493 17.636C41.1925 15.2929 41.1925 11.4939 38.8493 9.15072C36.5062 6.80758 32.7072 6.80758 30.364 9.15072L21.8788 17.636C19.5356 19.9792 19.5356 23.7781 21.8788 26.1213"
        stroke-linecap="butt"
      ></path>
    </svg>
  )
}
