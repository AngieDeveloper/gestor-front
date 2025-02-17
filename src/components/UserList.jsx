import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/userSlice";

const UserList = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (status === "loading") {
        return <div className="text-center p-6">Cargando usuarios...</div>;
    }

    if (status === "failed") {
        return <div className="text-center p-6 text-red-500">Error al cargar los usuarios: {error}</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-4">
            <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
            {users.map((user) => (
                <div key={user.id} className="border-b py-2 flex justify-between">
                    <span>{user.name} - {user.role}</span>
                    <button
                        onClick={() => dispatch(deleteUser(user.id))}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserList;
