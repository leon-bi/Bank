const axios = require("axios");

// Base URL of your server
const baseURL = "http://localhost:3000";



// Function to deposit money
async function deposit(amount) {
  try {
    const response = await axios.post(`${baseURL}/deposit`, { amount });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data.error);
  }
}

// Function to check balance
async function checkBalance() {
  try {
    const response = await axios.get(`${baseURL}/balance`);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data.error);
  }
}

// Function to withdraw money
async function withdraw(amount) {
  try {
    const response = await axios.post(`${baseURL}/withdraw`, { amount });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data.error);
  }
}
// export default deposit;  
// Test the functions
deposit(500); // Deposit 500
checkBalance(); // Check balance
withdraw(200); // Withdraw 200
checkBalance(); // Check balance again
