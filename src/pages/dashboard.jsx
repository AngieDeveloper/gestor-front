import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/authService";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      toast.error("Acceso denegado. Inicia sesión.");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold text-center">Dashboard</h2>
      <p className="text-gray-600 text-center mt-2">
        Bienvenido a tu gestor de tareas.
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded mt-4 hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;
