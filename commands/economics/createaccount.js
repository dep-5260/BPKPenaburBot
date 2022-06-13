const { BaseClient } = require('discord.js')

module.exports = {
    name: 'createaccount',
    description: 'Creates you an account on our local database',
    aliases: ['ca'],
    run: async(client, message, args) => {
        let worker = await client.ldb.createAccount(message.author.id)
        if(worker.success == true) {
            message.reply("success. I have made you your account on our local database.")
        } else {
            message.reply("failed. I think you already have an account on our local database. Try running `tk!bal`")
        }
    }
}