import { DerivedValue } from 'reactive-magic'
import Home from './Home.html'
import store from 'store'

function selector() {
    return {
        todos: store.todos.get()
    }
}

export default function(stateRouter) {
    stateRouter.addState({
        name: 'app.home',
        route: '/home',
        template: Home,
        resolve: (data, parameters, cb) => {
            cb(null, selector())
        },
        activate: ({ domApi: svelte }) => {
            const stream = new DerivedValue(() => {
                svelte.set(selector())
            })

            svelte.on('destroy', () => stream.stop())
        }
    })
}