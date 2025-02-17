import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/taskSlice";
import TaskCard from "../components/TaskCard";

const Board = () => {
    const dispatch = useDispatch();
    const { tasks, status } = useSelector((state) => state.tasks);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    const taskColumns = {
        ready: tasks.filter((task) => task.status === "ready"),
        inProgress: tasks.filter((task) => task.status === "inProgress"),
        stopped: tasks.filter((task) => task.status === "stopped"),
        notStarted: tasks.filter((task) => task.status === "notStarted"),
    };

    return (
        <div className="flex space-x-4 p-4 overflow-auto">
            {/* Ready Column */}
            <div className="w-1/5 bg-green-100 p-4 rounded">
                <h2 className="text-green-700 font-semibold">Listo: {taskColumns.ready.length}</h2>
                {taskColumns.ready.map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>

            {/* In Progress Column */}
            <div className="w-1/5 bg-yellow-100 p-4 rounded">
                <h2 className="text-yellow-700 font-semibold">En curso: {taskColumns.inProgress.length}</h2>
                {taskColumns.inProgress.map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>

            {/* Stopped Column */}
            <div className="w-1/5 bg-red-100 p-4 rounded">
                <h2 className="text-red-700 font-semibold">Detenido: {taskColumns.stopped.length}</h2>
                {taskColumns.stopped.map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>

            {/* Not Started Column */}
            <div className="w-1/5 bg-gray-200 p-4 rounded">
                <h2 className="text-gray-700 font-semibold">No Iniciado: {taskColumns.notStarted.length}</h2>
                {taskColumns.notStarted.map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Board;
