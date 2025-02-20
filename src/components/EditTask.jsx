import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import React from "react";

const EditTask = ({ task, onClose }) => {
    const [updatedTask, setUpdatedTask] = useState(task);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTask({ id: updatedTask._id, updatedTask }));
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-lg space-y-4">
            <input
                type="text"
                name="title"
                value={updatedTask.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
                className="w-full px-4 py-2 border rounded-md"
            />
            <div className="flex space-x-4">
                <select
                    name="status"
                    value={updatedTask.status}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md w-1/2"
                >
                    <option value="not sssStarted">Not Started</option>
                    <option value="in Progress">In Progress</option>
                    <option value="ready">Ready</option>
                    <option value="stopped">Stopped</option>
                </select>
                <select
                    name="priority"
                    value={updatedTask.priority}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md w-1/2"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="higth">Higth</option>
                </select>
            </div>
            <input
                type="date"
                name="date"
                value={updatedTask.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
            />
            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
};

export default EditTask;
