import App from './App.html'
import store from 'store'
import Home from './home'

function selector(state) {
    return {
        todos: state.todos
    }
}

export default function(stateRouter) {
    stateRouter.addState({
        name: 'app',
        route: '/',
        template: App,
        defaultChild: 'home'
    })

    Home(stateRouter)
}