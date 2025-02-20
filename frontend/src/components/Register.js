import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Particles from "./Particles"; // Import the Particles component
import "./Register.css"; // Import the CSS file for styling
import backgroundImageUrl from "./cap.jpeg";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://flashcard-learning-7zzf.onrender.com/api/auth/register", {
        username,
        password,
      });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };

  // Path to the background image in the public folder

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`, // Set the background image
      }}
    >
      {/* Add the Particles background */}
      <Particles
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        moveParticlesOnHover={true}
        particleHoverFactor={1}
        alphaParticles={true}
        particleBaseSize={100}
        sizeRandomness={1}
        cameraDistance={20}
        disableRotation={false}
        className="particles-background"
      />

      {/* Register form */}
      <div className="register-form-container">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
