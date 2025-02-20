import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/taskSlice";
import React from "react";

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, status } = useSelector((state) => state.tasks);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Task List</h2>
            <ul className="mt-4">
                {tasks.map((task) => (
                    <li key={task._id} className="p-3 bg-gray-100 my-2 rounded flex justify-between">
                        <span>{task.title}</span>
                        <button
                            onClick={() => dispatch(deleteTask(task._id))}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
