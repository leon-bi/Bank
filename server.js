const express = require("express");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

let balance = 0;

// Deposit endpoint
app.post("/deposit", async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  balance += amount;
  res.json({ message: "Deposit successful", balance });
});

// Balance endpoint
app.get("/balance", (req, res) => {
  res.json({ balance });
});

// Withdraw endpoint
app.post("/withdraw", (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }
  balance -= amount;
  res.json({ message: "Withdrawal successful", balance: balance });
});
// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
