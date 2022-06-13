const fetch = require('node-fetch')
module.exports = {
    name: 'db',
    description: 'Checks the database ping and status.',
    run: async(client, message, args) => {
        let n = new Date()
        fetch(`https://n.soblok.cf/online`).then(res => {
            if(res.status === 200) {
                message.channel.send(`**Database Ping:** ${(new Date() - n) / 10}ms \n**Database Status:** Online\n**Database Powered by:** DanBot & Cloudflare`)
            } else {
                message.channel.send(`**Database Ping:** ${(new Date() - n) / 10}ms \n**Database Status:** Offline _(Status Code: ${res.status})_\n**Database Powered by:** DanBot & Cloudflare`)
            }
        })
    }
}