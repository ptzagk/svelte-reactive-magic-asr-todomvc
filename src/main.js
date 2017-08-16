import StateRouter from 'abstract-state-router'
import SvelteRenderer from 'svelte-state-renderer'

import App from './app'

const stateRouter = StateRouter(SvelteRenderer(), document.querySelector('#root'))

App(stateRouter)

stateRouter.on('routeNotFound', () => {
    stateRouter.go('app')
})

stateRouter.evaluateCurrentRoute('app')