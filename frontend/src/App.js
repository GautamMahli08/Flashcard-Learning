import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FlashcardList from "./components/FlashcardList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div>
        
       
        <Routes>
          <Route
            path="/"
            element={token ? <FlashcardList token={token} /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
        </Routes>

         
         {token && (
          <div className="logout-button-container">
           <button onClick={handleLogout}>Logout</button>
            </div>
        )}
      </div>
    </Router>
  );
};

export default App;