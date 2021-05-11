const axios = require('axios');
const {Payload} = require('dialogflow-fulfillment');

const payload = {
    "richContent": [
      [
        {
          "type": "list",
          "title": "High Priority Tickets",
          "subtitle": "",
        },
        {
          "type": "divider"
        },
        {
          "type": "list",
          "title": "Medium Priority Tickets",
          "subtitle": "",
        },
        {
          "type": "divider"
        },
        {
          "type": "list",
          "title": "Low Priority Tickets",
          "subtitle": "",
        }
      ]
    ]
  };

let msg = '';


async function getPriorityTickets(token){
    // get total high tickets
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets/totalHigh',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        payload.richContent[0][0].subtitle = 'You have ' + response.data.count + ' high priority tickets';
    })
    .catch((error) => console.log(error));
    
    // get total medium tickets
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets//totalMedium',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        payload.richContent[0][2].subtitle = 'You have ' + response.data.count + ' medium priority tickets';
    })
    .catch((error) => console.log(error)) 

    // get total low tickets
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets//totalLow',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        payload.richContent[0][4].subtitle = 'You have ' + response.data.count + ' low priority tickets';
    })
    .catch((error) => console.log(error)) 
    
};

async function handlePriorityTicketIntent(agent){  
    token = agent.originalRequest.payload.userId;
    await getPriorityTickets(token)
    agent.add(
        new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
    )
}

module.exports = handlePriorityTicketIntent


