import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/taskSlice";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(task._id));
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <p className="text-gray-700">{task.title}</p>
            <div className="flex items-center mt-2">
                <span className={`text-xs ${task.status === "ready" ? "text-green-500" : task.status === "inProgress" ? "text-yellow-500" : task.status === "stopped" ? "text-red-500" : "text-gray-500"}`}>
                    {task.status}
                </span>
                <span className="ml-2 text-gray-500 text-xs">{task.date}</span>
                <span className="ml-2 text-gray-500 text-xs">{task.priority}</span>
            </div>
            <button
                onClick={handleDelete}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-xs"
            >
                Eliminar
            </button>
        </div>
    );
};

export default TaskCard;
