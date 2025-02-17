import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import React from "react";
import "./App.css";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="flex flex-col items-center justify-center px-4">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
