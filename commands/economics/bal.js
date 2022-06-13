const { BaseClient } = require('discord.js')
const db = require('../../api/webdb.js')

module.exports = {
    name: 'balance',
    description: 'Gets your economy balance',
    run: async(client, message, args) => {
        let worker = await client.ldb.getBalance(message.author.id);

        if(worker.success == true) {
            message.channel.send(`${message.author}, your balance is \`${Number(worker.balance).toLocaleString()}\`.`)
        } else {
            message.channel.send(`${message.author}, have you made an account yet?`)
        }
    }
}