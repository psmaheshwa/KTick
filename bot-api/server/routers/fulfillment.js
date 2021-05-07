const express = require('express');
const {WebhookClient} = require('dialogflow-fulfillment');
// create express router
const router = express.Router();

// Recieve webhook call from dialogflow
router.post('/',(req,res)=>{
    // get agent from request
    console.log(req);
    let agent = new WebhookClient({req:req,res:res});

    // create intent map for handling intent
    let intentMap = new Map();

    // add function to handle seprate intent
    intentMap.set('TestingIntent',handleTestingIntent);

    agent.handleRequest(intentMap);

    // send a response
    res.send('server is running');
});

function handleTestingIntent(){
    agent.add("Hello I am webhook demo")
}

// export router
module.exports = router;