import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/"); 
    }
  }, [navigate]);

  const login = () => {

    if(!username || !password) {
        setError("Preenche todos os campos!");
        return;
    }
    const data = { username: username, password: password };


    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("role", response.data.role);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError("Erro ao conectar ao servidor");
        }
      });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;