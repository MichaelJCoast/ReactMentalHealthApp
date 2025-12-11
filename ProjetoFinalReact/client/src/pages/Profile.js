import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    
    const username = localStorage.getItem("username");
    const userRole = localStorage.getItem("role");

    
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("username"); 
        navigate("/");
    };

    return (
        <div className="profileContainer">
            <h1>Perfil do Utilizador</h1>

            
            <div className="userInfo">
                <p><strong>Nome de Utilizador:</strong> {username}</p>
                <p><strong>Role:</strong> {userRole}</p>
            </div>

            
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
