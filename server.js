const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/');
app.set('view engine', 'ejs');


// path to our JSON file
const dataPath = "./details/useraccounts.json";

// util functions save data
const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};
const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

//update or deposit endpoint
app.post("/deposit", async(req, res) => {
  // Check if req.body.amount is null or less than or equal to 0
  if (req.body.amount === null || req.body.amount <= 0) {
    return res.status(400).send({ success: false, msg: "Invalid amount" });
  }

  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      // Parse the contents of the file as JSON
      const storedData = JSON.parse(data);

      console.log(`Stored Data: ${JSON.stringify(storedData)}`);

      // Calculate the new amount as the sum of the current amount and the amount provided in the request body
      const newAmount = storedData.amount + req.body.amount;
      console.log(`********newAmount: ${newAmount}`);

      // Update the value of the 'amount' property
      storedData.amount = newAmount;
      console.log(
        `This is Data after bieng summed: ${JSON.stringify(storedData)}`
      );

      const balance = storedData.amount;

      saveAccountData(storedData);
      
      // res.render('index.ejs', { balance });

      res.json({ message: "Deposit successful", balance });

    },
    true
  );

});

// Balance endpoint
app.get("/balance",async (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      // Parse the contents of the file as JSON
      const storedData = JSON.parse(data);

      console.log(`Stored Data: ${JSON.stringify(storedData)}`);

      const balance = storedData.amount;

      // res.render('index', { balance });
      res.json({ message: "This is the current", balance });
    },
    true
  );

});

// Withdraw endpoint
app.post("/withdraw", async(req, res) => {
  // Check if req.body.amount is null or less than or equal to 0
  if (req.body.amount === null || req.body.amount <= 0) {
    return res.status(400).send({ success: false, msg: 'Invalid amount' });
}
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      // Parse the contents of the file as JSON
      const storedData = JSON.parse(data);

      console.log(`Stored Data: ${JSON.stringify(storedData)}`);

      if (storedData.amount == 0 || storedData.amount <=0)
      return res.status(400).send({ success: false, msg: 'Insufficient Funds. Please refill your account' });

      // Calculate the new amount as the sum of the current amount and the amount provided in the request body
      const newAmount = storedData.amount - req.body.amount;
      console.log(`The Decrimented Amount to: ${newAmount}`);

      // Update the value of the 'amount' property
      storedData.amount = newAmount;
      console.log(
        `This is Data after bieng minused: ${JSON.stringify(storedData)}`
      );

      const balance = storedData.amount;

      saveAccountData(storedData);

      // res.render('index', { balance }).then.redirect();
      res.json({ message: "Deposit successful", balance });
    },
    true
  );
});
// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
