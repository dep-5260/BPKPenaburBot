const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Gives you the bot information embed',
    aliases: ['h'],
    run: async(client, message, args) => {
        let embed = new MessageEmbed()
        .setAuthor(`${client.user.username}'s help information`)
        .setDescription(`${client.commands.map(n => ` \`${n.name}\``)}`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/874129135834910730/d1ae38757450ade1e473eeec798251dc.webp?size=1024`)

        message.channel.send(embed)
    }
}