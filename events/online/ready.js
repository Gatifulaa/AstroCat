const { PresenceUpdateStatus, ActivityType } = require('discord.js');

require('colors')

module.exports = {
    name:'ready',
    execute: (client) => {
        client.once("ready", () => {
            client.user.setUsername("AstroCat")
            console.log(`Logado como ${client.user.tag}`.blue)
            client.user.setActivity({
                type: ActivityType.Custom,
                name: "customstatus",
                state: "LuStore🛒",
                status: PresenceUpdateStatus.Online
            })
        });
    }
}