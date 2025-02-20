import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import Particles from "./Particles"; // Import the Particles component
import "./Login.css"; // Import the CSS file for styling
import backgroundImageUrl from "./marvels.jpeg"; // Import the background image

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("${process.env.REACT_APP_API_URL}/api/auth/login", { username, password });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  // Path to the background image in the public folder
  

  return (
    <div
      className="login-page"
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

      {/* Login form */}
      <div className="login-form-container">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
