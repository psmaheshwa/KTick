// This handler is just for testing purpose
const axios = require('axios');


module.exports = function handleTestingIntent(agent){
    token = agent.originalRequest.payload.userId;
    agent.add("You are in backend server");
    axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets/assignedToMe',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => console.log(response.data.data.tickets))
    .catch((error) => console.log(error))    
} 




// Way to http call with axios with bearer token
// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// };

// const bodyParameters = {
//    key: "value"
// };

// Axios.post( 
//   'http://localhost:8000/api/v1/get_token_payloads',
//   bodyParameters,
//   config
// ).then(console.log).catch(console.log);


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