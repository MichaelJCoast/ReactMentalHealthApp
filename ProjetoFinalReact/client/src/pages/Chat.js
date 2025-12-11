import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [users, setUsers] = useState([]); 
  const [selectedUser , setSelectedUser ] = useState(null); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const username = localStorage.getItem("username"); 
  const token = localStorage.getItem("accessToken"); 

 
  
  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado para usar o chat.");
      return;
    }
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data); 
      } catch (error) {
        console.error("Erro ao carregar users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  
  useEffect(() => {
    if (selectedUser ) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get("http://localhost:3001/users/messages", {
            params: { from: username, to: selectedUser  },
            headers: { Authorization: `Bearer ${token}` },
          });
          setMessages(response.data); 
        } catch (error) {
          console.error("Erro ao carregar mensagens:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedUser , username, token]);

  
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      alert("Por favor, digite uma mensagem.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/messages",
        {
          from: username,
          to: selectedUser ,
          message: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

   
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setLoading(false); 
    }
  };

  return (
    <div className="chat-container">
      <div className="user-list">
        <h3>Usuários</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser (user.username)}
              style={{
                cursor: "pointer",
                fontWeight: selectedUser  === user.username ? "bold" : "normal",
                color: user.role === "Psicologo" ? "blue" : "black", 
              }}
            >
              {user.username} { user.role === "Psicologo" && <span>🧠</span>} 
            </li>
          ))}
        </ul>
      </div>

      <div className="message-area">
        {selectedUser  ? (
          <>
            <h3>Conversando com {selectedUser }</h3>
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.from === username ? "sent" : "received"
                  }`}
                >
                  <strong>{message.from}:</strong> {message.message}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button onClick={sendMessage} disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </>
        ) : (
          <p>Selecione um usuário para iniciar a conversa!</p>
        )}
      </div>
    </div>
  );
};

export default Chat;  
