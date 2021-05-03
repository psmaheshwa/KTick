/*
    Documentation
    - botbuilder helps to create a bot
    - restify help to create a rest api server
    - connector helps to connect bot to channel
    - storage is where we will store user data and dialog data
*/
const builder =  require('botbuilder');
const restify = require('restify');
const githubClient = require('./github-client');
const builderTeams = require('botbuilder-teams');
const dotenv = require('dotenv');
dotenv.config();

const connector = new builderTeams.TeamsChatConnector(
    {
        appId: process.env.MICROSOFT_TEAMS_BOT_ID,
        appPassword: process.env.MICROSOFT_TEAMS_BOT_PASSWORD
    }
);

const bot = new builder.UniversalBot(connector).set('storage',new builder.MemoryBotStorage());

// dialog conversation
const dialog = new builder.IntentDialog();

// default dialog
bot.dialog('/',dialog);

// match the intent of user and call the api
dialog.matches(/^search/i,[
    (session,args,next) => {
        if(session.message.text.toLowerCase() === 'search'){
            builder.Prompts.text(session,'Who are you looking for?');
        }else{
            var query = session.message.text.substring(7);
            next({response: query});
        }
    },
    (session,result,next) => {
        var query = result.response;
        if(!query){
            session.endDialog('Request cancelled');
        }else{
            githubClient.executeSearch(query,(profiles) => {
                var totalCount = profiles.total_count;
                if(totalCount === 0){
                    session.endDialog('Sorry no result found');
                }else if(totalCount > 10){
                    session.endDialog('more than 10 result are found. Please provide more restricted query');
                }else{
                    session.dialogData.property = null;
                    var usernames = profiles.items.map((item) => {
                        return item.login;
                    })
                    builder.Prompts.choice(session,'What user you want to load',usernames);
                }
            })
        }
    },
    (session,result,next) => {
        var username = result.response.entity;
        githubClient.loadProfile(username,(profile) => {
            var card = new builder.ThumbnailCard(session);
            card.title(profile.login);
            card.images([builder.CardImage.create(session,profile.avatar_url) ]);
            var text = '';
            if(profile.name) card.subtitle(profile.name);
            if(profile.company) text += profile.company + '\n';
            if(profile.email) text += profile.email + '\n';
            if(profile.bio) text += profile.bio;
            card.text(text);

            card.tap(new builder.CardAction.openUrl(session,profile.html_url));

            var message = new builder.Message(session).attachments([card]);
            session.send( message);
        })
    }
])

const server = restify.createServer();
server.post('/teams/messages',connector.listen());
server.listen(3978);  