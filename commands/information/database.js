const fetch = require('node-fetch')
module.exports = {
    name: 'db',
    description: 'Checks the database ping and status.',
    run: async(client, message, args) => {
        let n = new Date()
        if(client.database.type == 1) {
        fetch(`https://n.soblok.cf/online`).then(res => {
            if(res.status === 200) {
                message.channel.send(`**Database Ping:** ${(new Date() - n) / 10}ms \n**Database Status:** Online\n**Database Type:** Website\n**Database Powered by:** DanBot & Cloudflare`)
            } else {
                message.channel.send(`**Database Ping:** ${(new Date() - n) / 10}ms \n**Database Status:** Offline _(Status Code: ${res.status})_\n**Database Type:** Website\n**Database Powered by:** DanBot & Cloudflare`)
            }
        })
        } else {
            let ldb = await client.ldb.online()
            if(ldb) {
                message.channel.send(`**Database Ping:** ${(new Date() - n)}ms \n**Database Status:** Online \n**Database Type:** Local`)
            } else {
                message.channel.send(`**Database Ping:** ${(new Date() - n)}ms \n**Database Status:** Offline \n**Database Type:** Local`)
            }
        }
    }
}