import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import React from "react";

const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", user);
            alert("User successfully registered");
            setUser({ email: "", password: "" });
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred while registering the user");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: "url('https://i.redd.it/ypi134pr4rf61.png')",
            }}
        >
            <div
                className="bg-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[480px] relative flex flex-col items-center"
                style={{
                    backgroundImage: "url('https://wallpaperaccess.com/full/5341160.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.9,
                }}
            >
                <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">User Registration</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-100">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 bg-transparent
                            text-white
                            focus:border-purple-500"
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-100">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-3 bg-transparent  
                                text-white
                                focus:border-purple-500 pr-10"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-100 hover:text-purple-600"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-900 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-6 text-white text-lg">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-purple-900 font-semibold hover:underline hover:text-purple-700 transition"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;