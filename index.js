const Discord = require('discord.js');
const config = require('./config')

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.DirectMessages
    ],
    partials: [
        Discord.Partials.User,
        Discord.Partials.GuildMember,
        Discord.Partials.Message,
        Discord.Partials.Reaction
    ]
});

require('./handlers/commands')(client)
require('./handlers/events')(client)

process.on("unhandledRejection", (reason, p) => {
    console.error(`[ Event Error: unhandledRejection ]`.yellow, p, 'reason:', reason);
})
process.on("uncaughtException", (err, origin) => {
    console.error(`[ Event Error: uncaughtException ]`.yellow, err, origin);
})
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error(`[ Event Error: uncaughtExceptionMonitor ]`.yellow, err, origin);
})

client.login(config.discord.token);

module.exports = client