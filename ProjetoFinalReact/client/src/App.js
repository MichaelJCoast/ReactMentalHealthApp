import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Profile from "./pages/Profile";
import Chat from './pages/Chat';
import { useState } from 'react';
import CriarConsulta from './pages/Consultas';

function App() {
  const [authState, setAuthState] = useState(false);
  
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to="/">Home Page</Link>
          <Link to="/createPost">Create a Post</Link>

          {isAuthenticated ? (
            <>
              {userRole === "Admin" && (
                <Link to="/admin">Admin</Link>
              )}
              <Link to="/profile">Perfil</Link>
              <Link to="/consultas"></Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registo</Link>
            </>
          )}
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createPost" exact element={<CreatePost />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          
          <Route
            path="/admin"
            exact
            element={
              isAuthenticated && userRole === "Admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/consultas"
            element={
              isAuthenticated ? <CriarConsulta /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
