require('colors')
const Discord = require('discord.js')
const cor = require('../../config').discord.colors

module.exports = {
    name:'menção',
    execute: (client) => {
        client.on('messageCreate', (message) => {
            if(message.author.bot) return;
            if(message.content === `<@${client.user.id}>` || message.content === `<!@${client.user.id}>`){
                const MEmbed = new Discord.EmbedBuilder()
                .setTitle("<:EMention:1333606769611640842> Olá! Eu sou o CatBot")
                .setDescription(">>> Prazer, eu sou o LuBot! O próprio da LuStore!\n\nObs: Aceito somente comando em barra!")
                .setColor(cor)

                message.reply({ embeds: [MEmbed] })
            }
        })
    }
}