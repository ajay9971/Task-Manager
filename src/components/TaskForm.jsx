import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (!input.trim()) return;
        onAdd(input);
        setInput("");

    }

    return (
        <div className="input-group">
            <input placeholder="Enter task..." value={input} onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add Task</button>

        </div>
    );
}