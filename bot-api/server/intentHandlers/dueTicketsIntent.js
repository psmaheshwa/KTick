const axios = require('axios');
//const {Payload} = require('dialogflow-fulfillment');

let msg = '';


async function getDueTickets(token){
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets/dueExceed',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        msg = 'You have ' + response.data.count + ' exceeded due tickets ';
    })
    .catch((error) => console.log(error)) 
};

async function handleDueTicketIntent(agent){  
    token = agent.originalRequest.payload.userId;
    await getDueTickets(token)
    agent.add(msg);
};

module.exports = handleDueTicketIntent


