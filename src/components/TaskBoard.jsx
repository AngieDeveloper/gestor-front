import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus } from "../redux/taskSlice";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

const TaskBoard = ({ tasks, searchTerm }) => {
    const dispatch = useDispatch();
    const [taskColumns, setTaskColumns] = useState(() => {
        const statuses = ["ready", "inProgress", "stopped", "notStarted"];
        return statuses.map((status) => ({
            title: status.charAt(0).toUpperCase() + status.slice(1),
            id: status,
            tasks: tasks.filter((task) => task.status === status),
        }));
    });

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            dispatch(updateTaskStatus({ taskId: draggableId, status: destination.droppableId }));
        }

        setTaskColumns((prevColumns) => {
            const updatedColumns = [...prevColumns];
            const sourceColumn = updatedColumns.find((col) => col.id === source.droppableId);
            const destColumn = updatedColumns.find((col) => col.id === destination.droppableId);
            const movedTask = sourceColumn.tasks.find((task) => task._id === draggableId);

            sourceColumn.tasks = sourceColumn.tasks.filter((task) => task._id !== draggableId);
            destColumn.tasks.splice(destination.index, 0, movedTask);

            return updatedColumns;
        });
    };

    const statusStyles = {
        ready: { bg: "bg-teal-200", text: "text-teal-800" },
        inProgress: { bg: "bg-purple-200", text: "text-purple-800" },
        stopped: { bg: "bg-red-200", text: "text-red-800" },
        notStarted: { bg: "bg-gray-300", text: "text-gray-800" },
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {taskColumns.map((column) => (
                    <Droppable droppableId={column.id} key={column.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`p-4 rounded-lg shadow-lg ${statusStyles[column.id].bg}`}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className={`${statusStyles[column.id].text} font-bold text-lg`}>
                                        {column.title} ({column.tasks.length})
                                    </h2>
                                    <button
                                        onClick={() => column.tasks.forEach((task) => dispatch(deleteTask(task._id)))}
                                        className="text-xs text-red-400 hover:text-red-500"
                                        aria-label={`Delete all tasks in ${column.title}`}
                                    >
                                        Empty
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {column.tasks
                                        .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <motion.div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <TaskCard task={task} />
                                                    </motion.div>
                                                )}
                                            </Draggable>
                                        ))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </section>
        </DragDropContext>
    );
};

export default TaskBoard;
