const fs = require('fs')
const path = require('path')
require('colors')

function ListFiles(dir, arquivos, pastaPai, objectEventos, client){
    const files = fs.readdirSync(dir)

    files.forEach(file => {
        const filePath = path.join(dir, file)

        if(fs.statSync(filePath).isDirectory()) {
            ListFiles(filePath, arquivos, pastaPai, objectEventos, client)
        }
        else if(file.endsWith('.js')) {
            eventModule = require(filePath)
            eventName = eventModule.name

            arquivos.push(`${pastaPai}${file}`)

            if(typeof eventModule.execute ===  "function"){
                eventModule.execute(client)
            }

            if(!objectEventos[pastaPai]) objectEventos[pastaPai] = []
            objectEventos[pastaPai].push(eventName)
        }
    })
}

function eventsHandler(client){
    const eventsPath = path.resolve('./events')
    eventName = []
    objectEventos = {}

    ListFiles(eventsPath, eventName, 'events', objectEventos, client)

    const eventosCarregados = []

    for(let pastaPai in objectEventos){
        eventosCarregados.push(`[${pastaPai}: ${objectEventos[pastaPai].join(`, `)}]`)   
    }

    console.log(`[events]: Foram carregados ${eventosCarregados.join(' - ')}`.yellow)
}

module.exports = eventsHandler