require('dotenv').config()
global.Discord = require('discord.js');
const client = new Discord.Client();
global.fetch = require('node-fetch');
global.fs = require('fs');


/**
 * BPK Penabur Bot
 * Version 2.0.0
 */

client.items = new Discord.Collection();
client.begCD = new Discord.Collection();
client.database = {
    type: 2 // 1 = Web, 2 = Local
};
client.ldb = require('./localdb.js')

require('./api/items').forEach(item => {
    console.log(`[Item Loader]: Loaded ${item.name}`)
    client.items.set(item.name.toLowerCase(), item)
})

let status = {
    online: true
}

const { Collection } = require('discord.js');
const { token, prefix } = require('./config.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.once('ready', () => {
    console.log(`Bot Ready, Logged in as, ${client.user.tag}`)
})

let modulesToLoad = ['economics', 'information'];

modulesToLoad.forEach(async (module) => {
    fs.readdir(`./commands/${module}`, (err, files) => {
        if(err) return console.log(`${module} encountered: \n${err}`);
        files.forEach(file => {
            if(!file.endsWith('.js')) return;
            let command = require(`./commands/${module}/${file}`);
            if(command.name) {
                client.commands.set(command.name, command)
                console.log(`Loaded ${file}`)
                if(command.aliases) {
                    command.aliases.forEach(alias => {
                        client.aliases.set(alias, command.name)
                        console.log(`Loaded ${file}:${alias}`)
                    })
                }
                if(command.aliases.length === 0) command.aliases = null;
            }
        })
    })
})

client.on('message', async (message) => {
    if(!message.guild) return;
    if(message.author.bot) return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    if(!cmd) return;

    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!command) return;
    if(command.name === "db") return command.run(client, message, args);
    if(client.database.type == 1 && status.online == false) return message.reply("sorry. Our database is currently offline. To manually check, type `tk!db`. You can also manually check here https://takeaways.statuspage.io/")
    try {
        command.run(client, message, args)
    } catch(err) {
        console.log(err)
    }
})

client.login(process.env.token)