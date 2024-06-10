import './app.css'
import App from './App.svelte'

const targetEl = document.getElementById('app')
if (targetEl == null) {
  throw new Error('App target element not found!')
}
const app = new App({
  target: targetEl
})

export default app
