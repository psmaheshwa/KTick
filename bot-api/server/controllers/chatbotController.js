// prebuilt modules
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');


// Api endpoint that take request from frontend and chat to dialogflow
const chatbotApi = (req,res,next) => {
    runSample(req.body.MSG)
    .then((data) => {
        res.send({'Reply':data});  
    });
};

// A unique identifier for the given session
const sessionId = uuid.v4();

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'ktick-fjef') {


  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      KeyFileName:"D:\KTERN-Bot\Bot\temp\ktick-fjef-ee34eb01c3c5.json"
    });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}

module.exports = {
    chatbotApi
}