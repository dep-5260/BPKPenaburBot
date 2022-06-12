const { BaseClient } = require('discord.js')
const db = require('../../api/database')

module.exports = {
    name: 'balance',
    description: 'Gets your economy balance',
    run: async(client, message, args) => {
        let n = await db.exists(message.author.id)
        if(n) {
            let balance = await db.getBalance(message.author.id)
            message.reply("here. Your balance is " + `\`${Number(balance).toLocaleString()}\``)
        } else {
            message.reply("sorry. You haven't created an account yet on the database. Please type `tk!create` to create an account.")
        }
    }
}