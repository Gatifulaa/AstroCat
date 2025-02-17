const fs = require('fs').promises
const path = require('path')
require('colors')
const Discord = require('discord.js')

async function commandHandler(client) {
    const slashArray = []
    const comandosCarregados = []
    client.slashCommands = new Discord.Collection()

    try {
        const pastas = await fs.readdir('./commands')
        for(const subpastas of pastas) {
            const arquivos = await fs.readdir(`./commands/${subpastas}`)
            for(const arquivo of arquivos) {
                if(!arquivo.endsWith('.js')) return

                const command = require(path.resolve(`./commands/${subpastas}/${arquivo}`))

                if(!command.name || !command.description) {
                    console.log('[comandos] O comando a ser carregado não pode ser enviado por estar incompleto e portanto será ignorado'.yellow)
                }

                client.slashCommands.set(command.name, command)
                slashArray.push(command)
                comandosCarregados.push(command)
            }
        }

        client.on('ready', () => {
            client.guilds.cache.forEach(guild => guild.commands.set(slashArray))
            console.log(`comandos carregados: ${comandosCarregados.length}`.green)
        })
    } catch (error) {
        console.log('[comandos] Erro ao dar upload no sistema:'.red, error)
    }
}

module.exports = commandHandler