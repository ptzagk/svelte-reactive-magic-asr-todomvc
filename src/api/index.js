import fetch from 'isomorphic-unfetch'

const api = 'https://todo-backend-rails.herokuapp.com/'

function getBody(obj) {
    return JSON.stringify(obj)
}

function getHeaders(json = true) {
    const headers = new Headers()

    if (json) {
	headers.set('Content-Type', 'application/json')
    }

    return headers
}

export async function getTodos() {
    return fetch(`${api}`)
	.then(res => res.json())
	.catch(err => {
	    console.error(err)
	    return []
	})
}

export async function addTodo(todo) {
    return fetch(`${api}`, {
	body: getBody(todo),
	headers: getHeaders(),
	method: 'POST'
    })
	.then(res => res.json())
	.catch(err => {
	    console.error(err)
	    return undefined
	})
}

export async function editTodo(id, todo) {
    return fetch(`${api}${id}`, {
	body: getBody(todo),
	headers: getHeaders(),
	method: 'PATCH'
    })
	.then(res => res.json())
	.catch(err => {
	    console.error(err)
	    return undefined
	})
}

export async function deleteTodo(id) {
    return fetch(`${api}${id}`, { method: 'DELETE' })
	.catch(err => {
			console.error(err)
		})
}

export async function deleteAllTodos() {
    return fetch(`${api}`, { method: 'DELETE' })
	.then(res => res.json())
	.catch(err => {
	    console.error(err)
	    return undefined
	})
}
