const Discord = require('discord.js')
const cor = require("../../config").discord.colors
require('colors')

module.exports = {
    name:'memberAdd',
    execute: (client) => {
        client.on("guildMemberAdd", (member) => {
            const WelcomeId = "1329553538040463392"
            const channelWc = client.channels.cache.get(WelcomeId)
            const guildId = member.guild.id
            if(guildId === "1329519962263388191"){
                member.roles.add('1330241603796861021')
                let embedAdd = new Discord.EmbedBuilder()
                .setTitle(`👋 Seja bem-vindo(a) ${member.user.displayName}!`)
                .setDescription(`Bem-vindo(a) ${member.user.displayName} a ${member.guild.name}`)
                .addFields(
                    { name:"<:EEmoji:1333618845146943579> Regras", value:"Olhe o <#1329553595787645040> para previnir punições." },
                    { name:"<:EMention:1333606769611640842> Socialize", value:"Converse um pouco em <#1329553759000596531>!" },
                    { name:"🛒 Seja cliente", value:"Veio procurar algo? Olhe no <#1329563467589619735>" }
                )
                .setColor(cor)
                .setThumbnail(member.user.displayAvatarURL())

                channelWc.send({ embeds: [embedAdd] })
            }
        })
    }
}