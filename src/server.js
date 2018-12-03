/*
 * server.js
 * This file is the core of your bot
 *
 * It creates a little server using express
 * So, your bot can be triggered throught "/" route
 *
 * This file was made for locally testing your bot
 * You can test it by running this command
 * curl -X "POST" "http://localhost:5000" -d '{"text": "YOUR_TEXT"}' -H "Content-Type: application/json; charset=utf-8"
 * You might modify the server port ^^^^  depending on your configuration in config.js file
 */

const express = require('express')
const bodyParser = require('body-parser')

// Load configuration
require('./config')
    //const bot = require('./bot')

// Start Express server
const app = express()
app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())

app.post('/CreateSOW', (req, res) => {
    console.log(req.body.conversation.memory.MatNo.value)
    let materialNo = req.body.conversation.memory.MatNo.value.toString().toUpperCase();
    let qty = req.body.conversation.memory.Qty.value;
    res.send({
        replies: [{
            type: 'text',
            content: 'Created Order for Material '+materialNo + " with Qty "+ qty ,
    }],
        conversation: {
            memory: {
                key: 'value'
            }
        }
    })
})

if (!process.env.REQUEST_TOKEN) {
    console.log('ERROR: process.env.REQUEST_TOKEN variable in src/config.js file is empty ! You must fill this field with the request_token of your bot before launching your bot locally')

    process.exit(0)
} else {
    // Run Express server, on right port
    app.listen(app.get('port'), () => {
        console.log('Our bot is running on port', app.get('port'))
    })
}