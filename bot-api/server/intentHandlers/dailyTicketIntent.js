const axios = require('axios');
//const {Payload} = require('dialogflow-fulfillment');

let msg = '';


async function getTodayTickets(token){
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/tickets/totalToday',
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        msg = 'You have ' + response.data.count + ' tickets for today';
    })
    .catch((error) => console.log(error)) 
};

async function handleDailyTicketIntent(agent){  
    token = agent.originalRequest.payload.userId;
    await getTodayTickets(token)
    agent.add(msg);
};

module.exports = handleDailyTicketIntent


