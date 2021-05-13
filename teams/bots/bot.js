const axios = require('axios')
const { TeamsActivityHandler } = require('botbuilder');
const { CardFactory } = require('botbuilder');
const ACData = require('adaptivecards-templating')


const createTicketCard = require('../cards/createTicket.json')
const getCreatedTickets = require('../cards/createdTickets.json')
const getAssignedTickets = require('../cards/assignedTickets.json')

class Bot extends TeamsActivityHandler{

    constructor(token) {
        super();
        this.token = token
        this.flag = false

        this.onMessage(async (context, next) => {



            if(context.activity.text === 'hi'){
                // handle simple hi
                context.sendActivity('how may I help you?')
            }else if(context.activity.text === 'get assigned tickets'){
                // handle assigned tickets
                await context.sendActivity({
                    attachmentLayout: "carousel",
                    attachments: await this.getAssignedTickets()
                })
            }else if(context.activity.text === 'get created tickets'){
                // give all created tickets
                await context.sendActivity({
                    attachmentLayout: "carousel",
                    attachments: await this.getCreatedTickets()
                })
            }else if (context.activity.text === 'create ticket'){
                // create a ticket
                context.sendActivity({
                    attachments:[
                    this.createTicketCard()
                    ]
                })
            }else if(context.activity.text === 'close ticket'){
                context.sendActivity('I will close a ticket for you')
            }else if(context.activity.text === 'show token'){
                context.sendActivity(this.token)
            }else if(context.activity.value){
                console.log(context.activity.value)
                await this.createTicket(context.activity.value)
                if(this.flag){
                    context.sendActivity('Ticket created')
                }else{
                    context.sendActivity('Failed creating ticket')
                }
            }else{
                context.sendActivity('Please provide a valid command')
            }
            await next();
        });
    }



    // create an adaptive card for create ticket
    createTicketCard(){
        return CardFactory.adaptiveCard(createTicketCard);
    }

    // make a call to create ticket
    async createTicket(ticket){
        await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/tickets/',
            headers: { Authorization: `Bearer ${token}` },
            data: ticket
        })
        .then((response) => {
            console.log('Successfully created ticket')
            this.flag = true
        })
        .catch((error) => console.log(error)) 
    }


    // show all created tickets
    async getCreatedTickets(){
        
        var numberOfTickets = 0;
        var tickets = [];
        var cards = [];
        var adaptiveCards = [];

        // get data
        await axios({
            method: 'get',
            url: 'http://localhost:3000/api/v1/tickets/createdByMe',
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            console.log('Successfully fetched data');
            numberOfTickets = response.data.results;
            tickets = response.data.data.tickets;
        })
        .catch((error) => console.log(error)) 

        var template = new ACData.Template(getCreatedTickets);
        // Specify data at runtime
        
        for(let i=0;i<numberOfTickets;i++){
            cards[i] = template.expand({
                $root : tickets[i]
            })

            adaptiveCards[i] = CardFactory.adaptiveCard(cards[i])
        }
        // var card = template.expand({
        //     $root: {

        //     }
        // });
        // return CardFactory.adaptiveCard(card);     
        return adaptiveCards;
    }


    // show all assigned tickets
    async getAssignedTickets(){
        
        var numberOfTickets = 0;
        var tickets = [];
        var cards = [];
        var adaptiveCards = [];

        // get data
        await axios({
            method: 'get',
            url: 'http://localhost:3000/api/v1/tickets/assignedToMe',
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            console.log('Successfully fetched data');
            numberOfTickets = response.data.results;
            tickets = response.data.data.tickets;
        })
        .catch((error) => console.log(error)) 

        var template = new ACData.Template(getAssignedTickets);
        // Specify data at runtime
        
        for(let i=0;i<numberOfTickets;i++){
            cards[i] = template.expand({
                $root : tickets[i]
            })

            adaptiveCards[i] = CardFactory.adaptiveCard(cards[i])
        }
        // var card = template.expand({
        //     $root: {

        //     }
        // });
        // return CardFactory.adaptiveCard(card);     
        return adaptiveCards;
    }

}

module.exports.Bot = Bot;
