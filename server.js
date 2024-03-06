const express = require('express');
//initialise the app
const app = express();

app.listen(3000,() => {
    console.log('server is running on port 3000')
});

app.get('/',(req, res) =>{
 res.send('Hello from Node API');
})