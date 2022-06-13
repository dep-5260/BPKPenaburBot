const { BaseClient } = require('discord.js')

module.exports = {
    name: 'beg',
    description: 'You can beg for money',
    run: async(client, message, args) => {
        let user = await client.ldb.exists(message.author.id)
        if(user.exists == false) return message.reply("sorry. You haven't created an account yet on the database. Please type `tk!create` to create an account.");

        function random(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        };

        let last = client.begCD.get(message.author.id) || 0
        if(60 > (new Date()/1000 - last)) return message.reply("you still have a cooldown on using this command.");

        let won = random(250, 6500);
        client.ldb.addBalance(message.author.id, won)
        message.reply(`congrats. You won \`${won.toLocaleString()}\`!`)
        client.begCD.set(message.author.id, new Date() / 1000)
    }
}