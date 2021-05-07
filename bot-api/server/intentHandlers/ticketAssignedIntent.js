// Intent handler for showing all the tickts assigned to user
const {Text, Card, Image, Suggestion, Payload} = require('dialogflow-fulfillment');

module.exports = function handleTestingIntent(agent){
    agent.add("You have 20 tickets assigned to you ");
} 

// Example for custom payload
// const payload = {
//     "richContent": [
//       [
//         {
//           "type": "list",
//           "title": "List item 1 title",
//           "subtitle": "List item 1 subtitle",
//           "event": {
//             "name": "",
//             "languageCode": "",
//             "parameters": {}
//           }
//         },
//         {
//           "type": "divider"
//         },
//         {
//           "type": "list",
//           "title": "List item 2 title",
//           "subtitle": "List item 2 subtitle",
//           "event": {
//             "name": "",
//             "languageCode": "",
//             "parameters": {}
//           }
//         }
//       ]
//     ]
//   };
  
//   agent.add(
//     new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
//   );