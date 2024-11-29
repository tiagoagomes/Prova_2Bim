const express = require("express");
const router = express.Router();
const Contract = require("../models/Contract");

// Criar um Contrato
router.post("/", async (req, res) => {
  const { terms, clientId, contractorId, status } = req.body;
  try {
    const contract = await Contract.create({
      terms,
      clientId,
      contractorId,
      operationDate: new Date(),
      status: status || "Ativo",
    });
    res.status(201).json(contract);
  } catch (error) {
    console.error("Erro ao criar contract:", error.message);
    res
      .status(500)
      .json({ error: "Erro ao criar contract", details: error.message });
  }
});

// Listar todos os Contratos
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contracts = await Contract.findAll({ where: { clientId: id } });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar contracts" });
  }
});

module.exports = router;
