import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function TaskPage(){
    const[tasks,setTasks]=useState([]);
    const[filter,setFilter]=useState("all");


    //Load from localStorage
useEffect(()=>{
const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
},[]);

//save to localStorage

useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
},[tasks]);

const addTask = (text)=>{
setTasks((prev)=>[
    ...prev,{id:Date.now(), text, completed:false}
]);
};

const deleteTask = (id)=>{
    setTasks((prev)=>prev.filter((t)=>t.id!==id));
}

const toggleTask=(id)=>{
    setTasks((prev)=>prev.map((t)=>t.id ===id ? {...t ,completed:!t.completed}:t));
};


const editTask = (id,newText)=>{
    setTasks((prev)=>prev.map((t)=>t.id ===id ? {...t,text:newText}:t))
}

const filterTasks = tasks.filter((t)=>{
    if(filter ==="completed") return t.completed;
    if(filter ==="pending")return !t.completed;
    return true;
});

return (
    <div>
        <TaskForm onAdd={addTask}/>

        <div className="filters">
            <button className="active" onClick={()=>setFilter("all")}>All</button>
            
            <button onClick={()=>setFilter("completed")}>Completed</button>
            
            <button onClick={()=>setFilter("pending")}>Pending</button>
        </div>
        {
            filterTasks.length === 0 && <p>No Tasks found</p>
        }

        {filterTasks.map((task)=>(
            <TaskItem 
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
            />
        ))}
    </div>
)
}