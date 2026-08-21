import TodoItem from './TodoItem'

export default function TodoList({
    todos,
    onDelete,
    onToggle,
    onEdit,
}) {
    if (todos.length === 0) {
        return (
            <div className="mt-8 rounded-xl border border-dashed border-slate-700 p-8 text-center">
                <p className="text-slate-400">
                    No todos yet. Add your first todo!
                </p>
            </div>
        )
    }

    return (
        <div className="mt-8 space-y-4">
            {todos.map(todo => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onEdit={onEdit}
                />
            ))}
        </div>
    )
}