require('dotenv').config()
global.Discord = require('discord.js');
const client = new Discord.Client();
global.fetch = require('node-fetch');
global.fs = require('fs');

client.items = new Discord.Collection();
client.begCD = new Discord.Collection();

require('./api/items').forEach(item => {
    console.log(`[Item Loader]: Loaded ${item.name}`)
    client.items.set(item.name.toLowerCase(), item)
})

let status = {
    online: true
}

setInterval(function() {
    fetch(`https://n.soblok.cf/online`).then(res => {
        console.log(res.status)
        if(res.status == 200) {
            status.online = true
        } else {
            status.online = false
        }
    })
}, 5000)

const { Collection } = require('discord.js');
const { token, prefix } = require('./config.json');
client.commands = new Discord.Collection();

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

    let command = client.commands.get(cmd);
    if(!command) return;
    if(command.name === "db") return command.run(client, message, args);
    if(status.online == false) return message.reply("sorry. Our database is currently offline. To manually check, type `tk!db`. You can also manually check here https://takeaways.statuspage.io/")
    try {
        command.run(client, message, args)
    } catch(err) {
        console.log(err)
    }
})

client.login(process.env.token)