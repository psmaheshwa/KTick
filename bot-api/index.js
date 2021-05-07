const express = require('express');
const app = express();

// middlewares
app.use(express.json());

// routers
app.use('/webhook',require('./server/routers/dialogflow'));


app.listen(5000,()=>{
    console.log("Server running on port 5000");
})