const express = require('express');
const router = express.Router();
const { users , consultas, messages} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await users.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

  
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    
    const token = jwt.sign({ userId: user.id, username: user.username }, "importantsecret", { expiresIn: '1h' });

    
    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await users.create({ username, password, role });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});


router.get('/', async (req, res) => {
    try {
      const allUsers = await users.findAll({
        attributes: ['id', 'username'], 
      });
      res.json(allUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  });

  router.get('/', async (req, res) => {
    const { from, to } = req.query;
  
    try {
      const chatMessages = await messages.findAll({
        where: {
          [Op.or]: [
            { from, to },
            { from: to, to: from },
          ],
        },
        order: [['createdAt', 'ASC']], 
      });
      res.json(chatMessages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar mensagens' });
    }
  });

  router.post('/consultas', async (req, res) => {
    const { psicólogo_id, data, hora } = req.body;
    
    
    if (!psicólogo_id || !data || !hora) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }
    
    try {
      const consulta = await consultas.create({ psicólogo_id, data, hora });
      res.status(201).json({ message: 'Consulta criada com sucesso!', consulta });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao salvar consulta' });
    }
  });

  router.get('/messages', async (req, res) => {
    const { from, to } = req.query;
  
    try {
      const chatMessages = await messages.findAll({
        where: {
          [Op.or]: [
            { from, to },
            { from: to, to: from },
          ],
        },
        order: [['createdAt', 'ASC']], 
      });
      res.json(chatMessages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar mensagens' });
    }
  });
  
  
  router.post('/', async (req, res) => {
    const { from, to, message } = req.body;
  
    try {
      const newMessage = await messages.create({ from, to, message });
      res.json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
  });
  

module.exports = router;