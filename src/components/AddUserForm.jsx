import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import React from "react";

const AddUserForm = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ name: "", email: "", role: "user" });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(user));
        setUser({ name: "", email: "", role: "user" });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };
    const AddUserForm = () => {
        const user = useSelector((state) => state.auth.user); // Suponiendo que tienes auth en tu Redux
        const dispatch = useDispatch();

        if (user.role !== "admin") {
            return <div>No tienes permisos para agregar usuarios.</div>;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Agregar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full p-2 border mb-2"
                    value={user.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border mb-2"
                    value={user.email}
                    onChange={handleChange}
                />
                <select
                    name="role"
                    className="w-full p-2 border mb-2"
                    value={user.role}
                    onChange={handleChange}
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Agregar
                </button>
            </form>
        </div >
    );
};

export default AddUserForm;
