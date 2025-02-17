import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import UserManagement from "./pages/UserManagement";
import Register from "./pages/register"
import Board from "./pages/Board"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/board" element={<Board />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
