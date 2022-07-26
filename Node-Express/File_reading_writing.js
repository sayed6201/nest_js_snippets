const fs = require('fs')

//wrinintg ot txt file
fs.writeFileSync('notes.txt', 'I live in Philadelphia')

//reading json file and converting it json from buffer
const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)