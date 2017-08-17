import { DerivedValue, Value } from 'reactive-magic'
import * as api from 'api'

export function addTodo(text) {
	const todo = {
		order: todos.get().length,
		title: text
	}
    api.addTodo(todo)
	.then(todo => {
		todos.update(todos => {
			todos.unshift(todo)
			return todos
		})
	})
}

export function clearCompleted() {
    todos.get().map(todo => {
        if (todo.completed) {
            deleteTodo(todo.id)
        }
    })
}

export function completeAll() {
    todos.get().map(todo => {
        if (!todo.completed) {
            completeTodo(todo.id)
        }
    })
}

export function completeTodo(id) {
    const todo = todos.get().find(t => t.id === id)

    if (!todo) {
	return
    }

    api.editTodo(id, { completed: !todo.completed })
        .then(todo => {
            todos.update(todos => todos.map(t => t.id === id ? todo : t))
	})
}

export function deleteTodo(id) {
    api.deleteTodo(id)
        .then(todo => todos.update(todos =>
	todos.filter(t => t.id !== id)))
}

export function editTodo(id, text) {
    api.editTodo(id, { title: text})
	.then(todo => {
	    todos.update(todos => todos.map(t => t.id === id ? todo : t))
	})
}

export async function fetchTodos() {
	todos.set(await api.getTodos())
}

const todos = new Value([])

export default {
    todos
}
