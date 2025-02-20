import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/taskSlice";
import React from "react";

const AddTask = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("notStarted");
    const [priority, setPriority] = useState("baja");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const newTask = { title, status, priority, date };
        try {
            await dispatch(createTask(newTask)).unwrap();
            setSuccess("Tarea agregada exitosamente.");
            // Limpia los campos después de agregar
            setTitle("");
            setStatus("notStarted");
            setPriority("baja");
            setDate("");
            if (onClose) onClose(); // Cierra el modal si se proporciona la función
        } catch (err) {
            setError("Error al agregar la tarea. Intenta nuevamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="flex space-x-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-4 py-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="notStarted">No iniciado</option>
                    <option value="inProgress">En curso</option>
                    <option value="ready">Listo</option>
                    <option value="stopped">Detenido</option>
                </select>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="px-4 py-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                +
            </button>
        </form>
    );
};

export default AddTask;
