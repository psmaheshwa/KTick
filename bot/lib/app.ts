import { BotFrameworkAdapter } from "botbuilder";
import * as restify from "restify";

import { EchoBot } from "./bot";


//create server 
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} is listning on ${server.url}`);
});

// create an adabter for the bot
// microsoft app id and password are required when we deploy to azure not to worry in localhost
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot:EchoBot = new EchoBot();

server.post("/api/messages",(req,res) => {
    adapter.processActivity(req,res,async(context) => {
        await bot.onTurn(context);
    } );
})

 