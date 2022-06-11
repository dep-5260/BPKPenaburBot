const fetch = require('node-fetch');

function getBalance(userId) {
    return fetch(`https://n.soblok.cf/getUserBalance?user=${userId}`).then(res => {
        if(res.status === 200) {
            return fetch(`https://n.soblok.cf/getUserBalance?user=${userId}`).then(v=>v.text()).then(body => {
                return body
            })
        } else {
            throw new Error("The user hasn't made an account yet.")
        }
    })
}

function createAccount(userId) {
    return fetch(`https://n.soblok.cf/createAccount?user=${userId}`).then(res => {
        if(res.status === 200) {
            return {worked: true}
        } else {
            throw new Error("Failed")
        }
    })
}

module.exports = {
    getBalance: getBalance,
    createAccount: createAccount
}