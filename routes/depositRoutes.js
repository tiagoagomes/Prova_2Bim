const express = require("express");
const router = express.Router();
const Deposit = require("../scr/models/Deposit");

// Criar um depósito
router.post("/", async (req, res) => {
  const { clientId, depositValue } = req.body;
  try {
    const deposit = await Deposit.create({
      clientId,
      operationDate: new Date(),
      depositValue,
    });
    res.status(201).json(deposit);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar depósito" });
  }
});

module.exports = router;
