import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Obtener todos los usuarios (solo para administradores)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Registrar un nuevo usuario
export const createUser = createAsyncThunk("users/createUser", async (user) => {
    const response = await axios.post(API_URL, user);
    return response.data;
});

// Actualizar un usuario
export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
    const response = await axios.put(`${API_URL}/${user.id}`, user);
    return response.data;
});

// Eliminar un usuario
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const userSlice = createSlice({
    name: "users",
    initialState: { users: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            });
    },
});


export default userSlice.reducer;
