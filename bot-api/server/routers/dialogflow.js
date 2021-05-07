const express = require('express');
const {WebhookClient} = require('dialogflow-fulfillment');

// Import Intent handlers
testingIntentHandler = require('../intentHandlers/testingIntent');
ticketsAssignedIntentHandler = require('../intentHandlers/ticketAssignedIntent');

const router = express.Router();

router.post('/',(req,res)=>{
    // making agent to listen to webhook
    let agent = new WebhookClient({request:req,response:res});
    console.log(req.body.originalDetectIntentRequest.payload);
 
    let IntentMap = new Map(); 

    // Intent Handlers
    IntentMap.set('TestingIntent',testingIntentHandler);
    IntentMap.set('ShowTicketsAssignedToMe',ticketsAssignedIntentHandler);

    // make agent to map intents for request
    agent.handleRequest(IntentMap);
})

module.exports = router;
