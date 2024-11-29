const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const Deposit = require("../models/Deposit");

// Criar um Profile
router.post("/", async (req, res) => {
  const { firstname, lastname, profession, type, balance } = req.body;
  try {
    const profile = await Profile.create({
      firstname,
      lastname,
      profession,
      type,
      balance: balance || 0,
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar profile" });
  }
});

// Realizar depósito em um Profile
router.post("/:id/deposits", async (req, res) => {
  const { id } = req.params;
  const { depositValue } = req.body;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ error: "Profile não encontrado" });
    }

    profile.balance += depositValue;
    await profile.save();

    await Deposit.create({
      clientId: id,
      operationDate: new Date(),
      depositValue,
    });

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar depósito" });
  }
});

module.exports = router;
