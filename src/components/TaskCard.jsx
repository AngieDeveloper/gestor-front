import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/taskSlice";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(task._id));
    };

    // States Colors
    const statusColors = {
        "Ready": "bg-green-600 text-white",
        "In Progress": "bg-yellow-500 text-white",
        "Stopped": "bg-red-500 text-white",
        "Not Started": "bg-gray-500 text-white",
    };

    // Priority Colors
    const priorityColors = {
        "Higth": "bg-purple-600 text-white",
        "Medium": "bg-blue-500 text-white",
        "Low": "bg-gray-400 text-white",
    };

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2">{task.title}</p>
            <div className="flex items-center gap-2 flex-wrap text-sm">
                <span className={`px-2 py-1 rounded ${statusColors[task.status] || "bg-gray-500 text-white"}`}>
                    {task.status}
                </span>
                <span className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded">
                    📅 {task.date}
                </span>
                {task.priority && (
                    <span className={`px-2 py-1 rounded ${priorityColors[task.priority] || "bg-gray-400 text-white"}`}>
                        {task.priority}
                    </span>
                )}
            </div>
            <div className="mt-3 flex justify-between text-gray-400 text-sm">
                <button className="hover:text-white">💬</button>
                <button className="hover:text-white">📋</button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
