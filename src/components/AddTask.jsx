import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/taskSlice";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("notStarted");
    const [priority, setPriority] = useState("baja");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, status, priority, date };
        dispatch(createTask(newTask));
        setTitle("");
        setStatus("notStarted");
        setPriority("baja");
        setDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg space-y-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la tarea"
                required
                className="w-full px-4 py-2 border rounded-md"
            />
            <div className="flex space-x-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-4 py-2 border rounded-md w-1/2"
                >
                    <option value="notStarted">No iniciado</option>
                    <option value="inProgress">En curso</option>
                    <option value="ready">Listo</option>
                    <option value="stopped">Detenido</option>
                </select>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="px-4 py-2 border rounded-md w-1/2"
                >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
            </div>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Agregar tarea
            </button>
        </form>
    );
};

export default AddTask;
