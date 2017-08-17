import { DerivedValue } from 'reactive-magic'
import Home from './Home.html'
import store, { fetchTodos } from 'store'

function sortTodos(a, b) {
    if (a.order === b.order) {
	return 0;
    }

    return a.order < b.order ? 1 : -1
}

function selector() {
    return {
        todos: store.todos.get().sort(sortTodos)
    }
}

export default function(stateRouter) {
    stateRouter.addState({
        name: 'app.home',
        route: '/home',
        template: Home,
        resolve: (data, parameters, cb) => {
	    fetchTodos()

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
