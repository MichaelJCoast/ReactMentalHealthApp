import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CriarConsulta() {
  const [psicólogo_id, setPsicólogo_id] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [psicólogos, setPsicólogos] = useState([]);

  useEffect(() => {
    const fetchPsicólogos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users', {
          params: { role: 'Psicologo' },
        });
        setPsicólogos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPsicólogos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const consulta = { psicólogo_id, data, hora };
    console.log("Dados enviados:", consulta);
    try {
      const response = await axios.post("http://localhost:3001/users/consultas", consulta);
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro:", error.message, error.code);
      if (error.response) {
        console.error("Erro no servidor:", error.response.data);
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>Psicólogo:</label>
      <select value={psicólogo_id} onChange={(event) => setPsicólogo_id(event.target.value)}>
        <option value="">Selecione um psicólogo</option>
        {psicólogos.map((psicólogo) => (
          <option key={psicólogo.id} value={psicólogo.id}>
            {psicólogo.username}
          </option>
        ))}
      </select>
      <br />
      <label>Data:</label>
      <input type="date" value={data} onChange={(event) => setData(event.target.value)} />
      <br />
      <label>Hora:</label>
      <input type="time" value={hora} onChange={(event) => setHora(event.target.value)} />
      <br />
      <button type="submit">Criar Consulta</button>
    </form>
  );
}


export default CriarConsulta;
