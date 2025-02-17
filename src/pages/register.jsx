import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

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
                backgroundImage: "url('https://motionbgs.com/media/490/alone-hollow-knight.jpg')",
            }}
        >
            <div
                className="bg-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[480px] relative flex flex-col items-center"
                style={{
                    backgroundImage: "url('https://livewallp.com/wp-content/uploads/2023/11/Hollow-Knight-thumb.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.7,
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
                            className="mt-1 block w-full p-3 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-100">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-900 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
                    >
                        Register
                    </button>
                </form>

                {/* Login section */}
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
