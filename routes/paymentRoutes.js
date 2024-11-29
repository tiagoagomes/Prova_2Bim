const express = require("express");
const router = express.Router();
const Job = require("../scr/models/Job");
const Payment = require("../scr/models/Payment");

// Criar um pagamento
router.post("/", async (req, res) => {
  const { jobId, paymentValue } = req.body;
  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job não encontrado" });
    }

    await Payment.create({ jobId, operationDate: new Date(), paymentValue });

    job.paid = true;
    await job.save();

    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

module.exports = router;
