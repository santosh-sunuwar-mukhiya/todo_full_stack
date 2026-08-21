export default function TodoItem({
    todo,
    onDelete,
    onToggle,
    onEdit,
}) {
    return (
        <article
            className={`rounded-xl border p-5 transition ${
                todo.isCompleted
                    ? 'border-green-900 bg-green-950/30'
                    : 'border-slate-800 bg-slate-900'
            }`}
        >
            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0 flex-1">
                    <button
                        onClick={() => onToggle(todo)}
                        className="text-left"
                    >
                        <h3
                            className={`text-lg font-semibold ${
                                todo.isCompleted
                                    ? 'text-slate-500 line-through'
                                    : 'text-white'
                            }`}
                        >
                            {todo.title}
                        </h3>
                    </button>

                    <p
                        className={`mt-2 text-sm ${
                            todo.isCompleted
                                ? 'text-slate-600 line-through'
                                : 'text-slate-400'
                        }`}
                    >
                        {todo.description}
                    </p>
                </div>

                <button
                    onClick={() => onDelete(todo._id)}
                    className="rounded-lg px-2 py-1 text-xl text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                    aria-label="Delete todo"
                >
                    ×
                </button>
            </div>

            <div className="mt-4 flex items-center gap-2">

                <button
                    onClick={() => onToggle(todo)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                        todo.isCompleted
                            ? 'bg-green-600 hover:bg-green-500'
                            : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                >
                    {todo.isCompleted ? 'Completed' : 'Complete'}
                </button>

                <button
                    onClick={() => onEdit(todo)}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-500"
                >
                    Edit
                </button>
            </div>
        </article>
    )
}