import React from "react";
import { motion } from "framer-motion";

const Modal = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="bg-gray-800 p-6 rounded-lg">{children}</div>
        </motion.div>
    );
};

export default Modal;
