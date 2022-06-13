const { BaseClient } = require('discord.js')
const db = require('../../api/webdb.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'iteminfo',
    description: 'Gets information of an item',
    run: async(client, message, args) => {
        let n = args.slice(0).join(" ");
        let item = client.items.get(n.toLowerCase());

        let all = new MessageEmbed()
        .setAuthor("All items from my market")
        .setDescription(`${require('../../api/items').map(item => ` ${item.name}`)}`)

        if(!n) return message.channel.send(all);
        if(!item) return message.channel.send("Item not found", all)

        let single = new MessageEmbed()
        .setAuthor(`${item.name}'s information`)
        .setDescription(`
        **Item Name**: ${item.name}
        **Item Details**: ${item.details}

        **Obtainable**: ${item.obtainable}
        **Price**: ${item.price.toLocaleString()}
        `)
        .setThumbnail(`${item.thumbnail}`)

        message.channel.send(single)
    }
}