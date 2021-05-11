const axios = require('axios');
//const {Payload} = require('dialogflow-fulfillment');

let closeTickets;
let openTickets;
let closurePercentage;
let msg;


async function getClosurePerformance(token){
    // get total open tickets
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets/totalOpened',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        openTickets = response.data.count;
    })
    .catch((error) => console.log(error)) 

    // get total closed tickets
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets/totalClosed',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        closeTickets = response.data.count;
    })
    .catch((error) => console.log(error)) 

    // count closure performance and send it in message
    closurePercentage = ((closeTickets)/(closeTickets + openTickets))*100;
    msg = 'Your closure performance is ' + closurePercentage + '%';
    
};

async function handleClosurePerformanceIntent(agent){  
    token = agent.originalRequest.payload.userId;
    await getClosurePerformance(token);
    agent.add(msg);
};

module.exports = handleClosurePerformanceIntent


