import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// Obtener todas las tareas
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { data } = await API.get("/tasks");
  return data;
});

// Crear una tarea
export const createTask = createAsyncThunk("tasks/createTask", async (task) => {
  const { data } = await API.post("/tasks", task);
  return data;
});

// Actualizar una tarea
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTask }) => {
    const { data } = await API.put(`/tasks/${id}`, updatedTask);
    return data;
  }
);

// Eliminar una tarea
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await API.delete(`/tasks/${id}`);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = "succeeded";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ taskId, newStatus }, { dispatch }) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Error al actualizar la tarea");

      dispatch(fetchTasks());
    } catch (error) {
      console.error(error);
    }
  }
);

