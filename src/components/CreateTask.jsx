import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/taskSlice";
import React from "react";

const CreateTask = ({ onClose }) => {
    const [task, setTask] = useState({
        title: "",
        status: "notStarted",
        priority: "low",
        date: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.title.trim()) return;
        dispatch(createTask(task));
        setTask({ title: "", status: "notStarted", priority: "low", date: "" });
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 ">
            <div
                className="relative bg-gray-800 p-6 shadow-lg rounded-lg w-96 md:w-1/3 space-y-6"
                style={{
                    backgroundImage: "url('https://cdn.wallpapersafari.com/64/82/tU1anQ.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-0 right-1 text-3xl text-gray-200 hover:text-teal-400 transition duration-150"
                >
                    &times;
                </button>

                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                    className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-150"
                />
                <div className="flex space-x-4">
                    <select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        className="w-1/2 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-150"
                    >
                        <option value="notStarted">Not Started</option>
                        <option value="inProgress">In Progress</option>
                        <option value="ready">Ready</option>
                        <option value="stopped">Stopped</option>
                    </select>
                    <select
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                        className="w-1/2 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-150"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <input
                    type="date"
                    name="date"
                    value={task.date}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150"
                />
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-black font-semibold py-3 rounded-md hover:bg-teal-400 transition duration-150"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default CreateTask;
