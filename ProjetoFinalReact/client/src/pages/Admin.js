import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [error, setError] = useState(null);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        fetchUsers();
        fetchTotalPosts();
    }, []);
      
    const fetchUsers = async () => {
      try {
          const token = localStorage.getItem("accessToken");
          if (token) {
              
              const response = await axios.get("http://localhost:3001/users", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              console.log('Usuarios recebidos:', response.data); 
              setListOfUsers(response.data);
              console.log("Estado atualizado - listOfUsers:", response.data);
          } else {
              setError("Você não está autenticado.");
          }
      } catch (error) {
          console.error('Erro ao buscar usuários:', error);
          setError("Erro ao buscar usuários. Verifique suas permissões.");
      }
  };
 
  

    const fetchTotalPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3001/posts");
            setTotalPosts(response.data.length);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                await axios.delete(`http://localhost:3001/auth/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setListOfUsers(listOfUsers.filter(user => user.id !== userId));
            } else {
                setError("Você não está autenticado.");
            }
        } catch (error) {
            setError("Erro ao deletar usuário.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginBottom: "20px" }}>
                <h2>Estatísticas</h2>
                <p>Total de Usuários: {listOfUsers.length}</p>
                <p>Total de Posts: {totalPosts}</p>
            </div>

            <h2>Lista de Usuários</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Username</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfUsers.map((user) => (
                        <tr key={user.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.id}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.username}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.role}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
