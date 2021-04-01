// prebuilt modules
const express = require('express');

// chatbot controller to control the dialogflog logic
const chatbotController = require('../controllers/chatbotController');

// create a secondry router to route traffic to chatbot controller
const chatbotRouter = express.Router();

chatbotRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    //res.setHeader('Content-Type','text');
    next();
})
.get((req,res,next) => {
    res.end('Get request is not excepted');
})
.post(chatbotController.chatbotApi)
.put((req,res,next) => {
    res.end('put request is not excepted');
})
.delete((req,res,next) => {
    res.end('delete request is not excepted');
})


module.exports = chatbotRouter;
