import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";
import TaskBoard from "../components/TaskBoard";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Board = () => {
    const dispatch = useDispatch();
    const { tasks, status } = useSelector((state) => state.tasks);
    const [modalData, setModalData] = useState({ show: false, task: null });
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (status === "idle") dispatch(fetchTasks());
    }, [status, dispatch]);

    const openModal = useCallback((task = null) => {
        setModalData({ show: true, task });
    }, []);

    const closeModal = useCallback(() => {
        setModalData({ show: false, task: null });
    }, []);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const handleLogout = () => {
        console.log("Loging Out...");
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex w-full bg-cover bg-center" style={{ backgroundImage: "url('https://wallpaper.dog/large/20555437.jpg')" }}>
            <ToastContainer />

            {/* Sidebar */}
            <aside className={`bg-gray-800 w-20 h-screen flex flex-col items-start py-6 shadow-lg fixed top-0 left-0 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <button onClick={toggleSidebar} className="md:hidden p-3 text-white">
                    <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow md:ml-64 p-6 overflow-auto">
                <header className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-md mb-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-700 p-2 rounded text-white border-none w-1/3 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => openModal()} className="bg-teal-400 text-gray-900 px-4 py-2 rounded hover:bg-teal-500 transition">
                        +
                    </button>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-400 cursor-pointer" onClick={toggleMenu}>
                            <img src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1617765260761-95ZQRWCDRLOSBXZZKW5P/cp_thumbs__0003_HD-1.jpg" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-2">
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded">Log Out</button>
                            </div>
                        )}
                    </div>
                </header>

                {status === "loading" ? (
                    <p className="text-center text-gray-300">Loading Tasks...</p>
                ) : (
                    <TaskBoard tasks={tasks} searchTerm={searchTerm} />
                )}

                {/* Create/ Edit Modal */}
                {modalData.show && (modalData.task ? <EditTask task={modalData.task} onClose={closeModal} /> : <CreateTask onClose={closeModal} />)}
            </main>
        </div>
    );
};

export default Board;
