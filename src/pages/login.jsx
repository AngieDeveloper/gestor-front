import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import React from "react";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const { token } = response.data;

      keepLoggedIn ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
      toast.success("Inicio de sesión exitoso");
      navigate("/board");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center px-4"
      style={{ backgroundImage: "url('https://i.redd.it/4qg955z95hs51.jpg')" }}
    >
      <div
        className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-lg flex flex-col items-center"
        style={{
          backgroundImage: "url('https://images.hdqwalls.com/wallpapers/hollow-knight-2022-mz.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">LOGIN</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-purple-500 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox text-purple-500"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            <span className="text-white">Keep me logged in</span>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-900 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-white mt-4">
          Don't have an account?{' '}
          <span
            className="text-purple-300 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
