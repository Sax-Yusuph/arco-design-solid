/* @refresh reload */
import '@arco-themes/react-molly/css/arco.css'
import { render } from 'solid-js/web'

import App from './App'
import './index.css'

render(() => <App />, document.getElementById('root') as HTMLElement)
