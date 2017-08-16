import { DerivedValue, Value } from 'reactive-magic'

export function addTodo(text) {
    todos.update(todos => {
        todos.unshift({
            id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text
        })

        return todos
    })
}

export function clearCompleted() {
    todos.update(todos => todos.filter(todo => !todo.completed))
}

export function completeAll() {
    todos.update(todos => {
        const areAllMarked = todos.every(todo => todo.completed)
        return todos.map(todo => {
            todo.completed = !areAllMarked
            return todo
        })
    })
}

export function completeTodo(id) {
    todos.update(todos => todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed
        }

        return todo
    }))
}

export function deleteTodo(id) {
    todos.update(todos => todos.filter(todo => todo.id !== id))
}

export function editTodo(id, text) {
    todos.update(todos => todos.map(todo => {
        if (todo.id === id) {
            todo.text = text
        }

        return todo
    }))
}

const todos = new Value([])

export default {
    todos
}