const express = require('express');
const router = express.Router();
const { messages } = require('../models');
const { Op } = require('sequelize');


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

module.exports = router;