const Discord = require('discord.js')
const cor = require('../../config').discord.colors
require('colors')

module.exports = {
    name:'ticketCompra',
    execute: (client) => {
        client.on('interactionCreate', (interaction) => {
            if(interaction.isButton()) {
                if(interaction.customId === "ticket_compra") {
                    let nome_canal = `🛒-${interaction.user.id}`;
                    let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);

                    if(canal){
                        interaction.reply({ embeds: [
                            new Discord.EmbedBuilder()
                            .setTitle(`<:ETicket:1333584795212447825> - Ticket`)
                            .setDescription('<:EEmoji:1333618845146943579> Você já tem um ticket aberto! Aguarde um pouco')
                            .setColor('Red')
                        ], flags: Discord.MessageFlags.Ephemeral })
                    } else if(!canal){
                        let categoria = interaction.channel.parent;
                        if(!categoria) categoria = null;

                        interaction.guild.channels.create({
                            name:nome_canal,
                            parent:categoria,
                            type:Discord.ChannelType.GuildText,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [ Discord.PermissionFlagsBits.ViewChannel ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AddReactions,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks
                                    ]
                                },
                            ]
                        }).then( (chat) => {
                            interaction.reply({ embeds: [
                                new Discord.EmbedBuilder()
                                .setTitle(`<:ETicket:1333584795212447825> - Ticket`)
                                .setDescription(`Seu ticket foi aberto em ${chat}`)
                                .setColor(cor)
                            ], flags: Discord.MessageFlags.Ephemeral })
                            chat.send({ embeds: [
                                new Discord.EmbedBuilder()
                                .setTitle(`<:ETicket:1333584795212447825> - Ticket`)
                                .setDescription(`Obrigado pela preferência ${interaction.user.username}!\nAguarde um pouco logo iremos te atender!`)
                                .setColor(cor)
                            ], components: [ new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder()
                                .setCustomId('fechar_ticket')
                                .setStyle(Discord.ButtonStyle.Danger)
                                .setLabel('Fechar Ticket')
                                .setEmoji('<:XError:1333606800553021460>')
                            ) ] })
                        })
                    }
                } else{
                    const cancel = new Discord.ActionRowBuilder().addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId('ticket_cancelar')
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setEmoji('<:XError:1333606800553021460>')
                        .setLabel('Cancelar')
                    )
                    const confirm = new Discord.ActionRowBuilder().addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId('ticket_confirmar')
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setEmoji('<:ESucess:1333606784127991848>')
                        .setLabel('Confirmar')
                    )
                    if(interaction.customId === "fechar_ticket"){
                        interaction.reply({ embeds: [new Discord.EmbedBuilder()
                            .setTitle('<:ETicket:1333584795212447825> - Ticket')
                            .setDescription("<:EEmoji:1333618845146943579> Você tem certeza que deseja fechar o ticket?")
                            .setColor('Red')
                        ], components: [cancel, confirm], flags: Discord.MessageFlags.Ephemeral })
                    }
                } 
                if(interaction.customId === "ticket_cancelar"){
                    interaction.message.delete();
                } else{
                    if(interaction.customId === "ticket_confirmar"){
                        interaction.channel.delete()
                    }
                }
            }
        })
    }
}