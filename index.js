const express = require("express");
const sequelize = require("./database"); 
const app = express();

app.use(express.json()); 

// Importar rotas
const profileRoutes = require("./scr/routes/profileRoutes");
const contractRoutes = require("./scr/routes/contractRoutes");
const jobRoutes = require("./scr/routes/jobsRoutes");
const depositRoutes = require("./scr/routes/depositRoutes");
const paymentRoutes = require("./scr/routes/paymentRoutes");

// Usar rotas
app.use("/profiles", profileRoutes);
app.use("/contracts", contractRoutes);
app.use("/jobs", jobRoutes);
app.use("/deposits", depositRoutes);
app.use("/payments", paymentRoutes);

// Sincronizar o banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log("Banco de dados sincronizado");
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
