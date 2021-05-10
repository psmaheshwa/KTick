const { DialogBot } = require('./dialogBot');

class TeamsBot extends DialogBot {
    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Welcome to TeamsBot. Type anything to get logged in. Type \'logout\' to sign-out.');
                }
            }

            await next();
        });
    }

    async handleTeamsSigninVerifyState(context, state) {
        await this.dialog.run(context, this.dialogState);
    }
}

module.exports.TeamsBot = TeamsBot;
