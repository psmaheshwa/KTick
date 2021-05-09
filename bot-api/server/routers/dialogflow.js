const express = require('express');
const {WebhookClient} = require('dialogflow-fulfillment');


// Import Intent handlers
testingIntentHandler = require('../intentHandlers/testingIntent');
ticketsAssignedIntentHandler = require('../intentHandlers/ticketsAssignedIntent');
dailyTicketIntentHandler = require('../intentHandlers/dailyTicketIntent');
dueTicketIntentHandler = require('../intentHandlers/dueTicketsIntent');
assignedTicketsIntentHandler = require('../intentHandlers/ticketsAssignedIntent');

const router = express.Router();

router.post('/',(req,res)=>{
    // making agent to listen to webhook
    let agent = new WebhookClient({request:req,response:res});

    let IntentMap = new Map(); 

    // Intent Handlers
    IntentMap.set('AssignedTicketsIntent',assignedTicketsIntentHandler);
    IntentMap.set('DueTicketsIntent',dueTicketIntentHandler);
    IntentMap.set('TodayTicketsIntent',dailyTicketIntentHandler);
    IntentMap.set('TestingIntent',testingIntentHandler);
    IntentMap.set('ShowTicketsAssignedToMe',ticketsAssignedIntentHandler);

    // make agent to map intents for request
    agent.handleRequest(IntentMap);
})

module.exports = router;
