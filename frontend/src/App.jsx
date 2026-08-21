import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const API_URL = 'http://localhost:8000/api/todo'

export default function App() {
    const [todos, setTodos] = useState([])
    const [editingTodo, setEditingTodo] = useState(null)
    const [loading, setLoading] = useState(true)

    // GET all todos
    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/todos`)
            const data = await response.json()

            if (data.success) {
                setTodos(data.message)
            }
        } catch (error) {
            console.error('Failed to fetch todos:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    // CREATE todo
    const addTodo = async (todoData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData),
            })

            const data = await response.json()

            if (data.success) {
                setTodos(prevTodos => [...prevTodos, data.message])
            }
        } catch (error) {
            console.error('Failed to add todo:', error)
        }
    }

    // DELETE todo
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (data.success) {
                setTodos(prevTodos =>
                    prevTodos.filter(todo => todo._id !== id)
                )
            }
        } catch (error) {
            console.error('Failed to delete todo:', error)
        }
    }

    // TOGGLE completed
    const toggleTodo = async (todo) => {
        try {
            const response = await fetch(`${API_URL}/${todo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: todo.title,
                    description: todo.description,
                    isCompleted: !todo.isCompleted,
                }),
            })

            const data = await response.json()

            if (data.success) {
                setTodos(prevTodos =>
                    prevTodos.map(item =>
                        item._id === todo._id ? data.message : item
                    )
                )
            }
        } catch (error) {
            console.error('Failed to update todo:', error)
        }
    }

    // EDIT todo
    const updateTodo = async (todoData) => {
        try {
            const response = await fetch(
                `${API_URL}/${editingTodo._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: todoData.title,
                        description: todoData.description,
                        isCompleted: editingTodo.isCompleted,
                    }),
                }
            )

            const data = await response.json()

            if (data.success) {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === editingTodo._id
                            ? data.message
                            : todo
                    )
                )

                setEditingTodo(null)
            }
        } catch (error) {
            console.error('Failed to update todo:', error)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-3xl px-4 py-10">

                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold">
                        My Todo App
                    </h1>

                    <p className="mt-2 text-slate-400">
                        React + Express + MongoDB
                    </p>
                </header>

                <TodoForm
                    onAdd={addTodo}
                    onUpdate={updateTodo}
                    editingTodo={editingTodo}
                    onCancelEdit={() => setEditingTodo(null)}
                />

                {loading ? (
                    <p className="mt-8 text-center text-slate-400">
                        Loading todos...
                    </p>
                ) : (
                    <TodoList
                        todos={todos}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                        onEdit={setEditingTodo}
                    />
                )}
            </div>
        </div>
    )
}