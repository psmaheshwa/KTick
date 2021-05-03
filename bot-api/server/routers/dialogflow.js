// Import modules
const express = require('express');
const dialogflow = require('dialogflow');
require('dotenv').config();

// Build express router
const router = express.Router();

// Create a new session for dialogflow
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(process.env.googleProjectID,process.env.dialogFlowSessionID);
 
// Text Query Route
router.post('/textQuery',async(req,res) => {
    // build request to send to dialogflow
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: process.env.dialogFlowSessionLanguageCode,
        },
      },
    };
   
    // Send request 
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
  
    // send response to frontend
    res.send(result);
});

// Event Query Router
router.post('/eventQuery',async(req,res) => {
    // build request to send to dialogflow
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: req.body.event,
          // The language used by the client (en-US)
          languageCode: process.env.dialogFlowSessionLanguageCode,
        },
      },
    };
   
    // Send request 
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
  
    // send response to frontend
    res.send(result);
});

module.exports = router;
  
