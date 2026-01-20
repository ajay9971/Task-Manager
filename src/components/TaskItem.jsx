import { useState } from "react"

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
    const [editText, setEditText] = useState(task.text);
    const [editing, setEditing] = useState(false);


    const saveEdit = () => {
        onEdit(task.id, editText);
        setEditing(false);
    }


    return (
        <div className="task">
            <div className="task-left">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                {editing ? (<input value={editText} onChange={(e) => setEditText(e.target.value)} />) :
                    (<span className={task.completed ? "done" : ""}>{task.text}</span>)
                }</div>

            {editing ? (
                <button onClick={saveEdit}>Save</button>
            ) : (
                <button className="edit" onClick={() => setEditing(true)}>Edit</button>
            )}

            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    )
} 