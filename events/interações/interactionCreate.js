require('colors')
const Discord = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    execute: (client) => {
        client.on('interactionCreate', (interaction) => {
            if(interaction.type === Discord.InteractionType.ApplicationCommand) {
                const command = client.slashCommands.get(interaction.commandName)
        
                if(!command){
                    interaction.reply({ ephemeral: true, content: "Algo que não deu certo está errado!" })
                } else{
                    command.run(client, interaction)
                }
            }
        })
    }
}