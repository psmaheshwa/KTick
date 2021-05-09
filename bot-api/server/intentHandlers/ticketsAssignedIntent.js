const axios = require('axios');
//const {Payload} = require('dialogflow-fulfillment');

let msg = '';


async function getAssignedTickets(token){
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets/assigned',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        msg = 'You have ' + response.data.results + ' assigned tickets ';
    })
    .catch((error) => console.log(error)) 
};

async function handleAssignedTicketsIntent(agent){  
    token = agent.originalRequest.payload.userId;
    await getAssignedTickets(token)
    agent.add(msg);
};

module.exports = handleAssignedTicketsIntent


