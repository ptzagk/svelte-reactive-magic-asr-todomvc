import Home from './Home.html'
import store from 'store'

function selector(state) {
    return {
        todos: state.todos
    }
}

export default function(stateRouter) {
    stateRouter.addState({
        name: 'app.home',
        route: '/home',
        template: Home,
        resolve: (data, parameters, cb) => {
            const state = store.getState()

            cb(null, selector(state))
        },
        activate: ({ domApi: svelte }) => {
            const stream = store.subscribe(state => {
                svelte.set(selector(state))
            })

            svelte.on('destroy', () => stream.stop())
        }
    })
}