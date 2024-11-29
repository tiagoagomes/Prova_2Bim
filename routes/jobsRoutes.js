const express = require("express");
const router = express.Router();
const Job = require("../scr/models/Job");
const Payment = require("../scr/models/Payment")

// Criar um Job
router.post("/", async (req, res) => {
  const { contractId, description, paymentDate, price } = req.body;
  try {
    const job = await Job.create({
      contractId,
      description,
      operationDate: new Date(),
      paymentDate,
      price,
      paid: false,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar job" });
  }
});

// Realizar pagamento parcial de um Job
router.post("/:jobId/pay", async (req, res) => {
  const { jobId } = req.params;
  const { paymentValue } = req.body;

  try {
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job não encontrado" });
    }

    if (paymentValue <= 0) {
      return res
        .status(400)
        .json({ error: "O valor do pagamento deve ser maior que zero" });
    }

    // Somar os pagamentos já realizados
    const totalPaid = await Payment.sum("paymentValue", { where: { jobId } });

    const remaining = job.price - (totalPaid || 0);

    if (paymentValue > remaining) {
      return res.status(400).json({
        error: `O pagamento excede o valor restante (${remaining}).`,
      });
    }

    // Criar o registro de pagamento
    await Payment.create({
      jobId,
      paymentValue,
      operationDate: new Date(),
    });

    // Verificar se o job foi totalmente quitado
    if (paymentValue === remaining) {
      job.paid = true;
      await job.save();
    }

    res.status(200).json({
      message: "Pagamento realizado com sucesso",
      remaining: remaining - paymentValue,
      job,
    });
  } catch (error) {
    console.error("Erro ao realizar pagamento parcial:", error);
    res.status(500).json({ error: "Erro ao realizar pagamento parcial" });
  }
});

// Listar Jobs não pagos integralmente de um Contract
router.get("/:contractId/jobs/unpaid", async (req, res) => {
  const { contractId } = req.params;

  try {
    const jobs = await Job.findAll({
      where: { contractId },
    });

    const unpaidJobs = [];

    for (const job of jobs) {
      const totalPaid = await Payment.sum("paymentValue", {
        where: { jobId: job.id },
      });

      if ((totalPaid || 0) < job.price) {
        unpaidJobs.push({
          ...job.toJSON(),
          totalPaid: totalPaid || 0,
          remaining: job.price - (totalPaid || 0),
        });
      }
    }

    res.status(200).json(unpaidJobs);
  } catch (error) {
    console.error("Erro ao listar jobs não pagos integralmente:", error);
    res
      .status(500)
      .json({ error: "Erro ao listar jobs não pagos integralmente" });
  }
});

module.exports = router;
