import { useEffect, useState } from 'react'

const emptyForm = {
    title: '',
    description: '',
}

export default function TodoForm({
    onAdd,
    onUpdate,
    editingTodo,
    onCancelEdit,
}) {
    const [formData, setFormData] = useState(emptyForm)

    const isEditing = Boolean(editingTodo)

    useEffect(() => {
        if (editingTodo) {
            setFormData({
                title: editingTodo.title,
                description: editingTodo.description,
            })
        } else {
            setFormData(emptyForm)
        }
    }, [editingTodo])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title.trim() || !formData.description.trim()) {
            return
        }

        if (isEditing) {
            await onUpdate(formData)
        } else {
            await onAdd(formData)
        }

        setFormData(emptyForm)
    }

    const handleCancel = () => {
        setFormData(emptyForm)
        onCancelEdit()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl"
        >
            <h2 className="mb-4 text-xl font-semibold">
                {isEditing ? 'Edit Todo' : 'Add Todo'}
            </h2>

            <div className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Todo title"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Todo description"
                    rows="3"
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium transition hover:bg-blue-500"
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-lg bg-slate-700 px-5 py-2.5 font-medium transition hover:bg-slate-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
}