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

function setBalance(userId, balance) {
    return fetch(`https://music.soblok.cf/setBalance?user=${userId}&bal=${balance}`).then(res => {
        if(res.status === 200) {
            return {success:true}
        } else {
            throw new Error('database.js/setBalance failed.')
        }
    })
}

function addUserBalance(userId, balance) {
    return getBalance(userId).then(data => {
        let f = Number(data)
        return setBalance(userId, f = f + balance).then(body => {
            if(body.success == true) {
                return {success:true}
            } else {
                throw new Error('database.js/addUserBalance/getBalance:setBalance failed')
            }
        }).catch(err => {
            throw new Error(err)
        })
    }).catch((err) => {
        throw new Error(err)
    })
}

function subUserBalance(userId, balance) {
    return getBalance(userId).then(data => {
        return setBalance(userId, data - balance).then(body => {
            if(body.success == true) {
                return {success:true}
            } else {
                throw new Error('database.js/subUserBalance/getBalance:setBalance failed')
            }
        }).catch(err => {
            throw new Error(err)
        })
    }).catch((err) => {
        throw new Error(err)
    })
}

function exists(userId) {
    return fetch(`https://n.soblok.cf/exists?user=${userId}`).then(b=>b.text()).then(d => {
        if(d === "true") {
            return true
        }
        return false
    })
}

function checkStatus() {
    return fetch(`https://n.soblok.cf/online`).then(res => {
        if(res.status === 200) {
            return {online: true, message: "Up"}
        }
        return {online: false, message: "Down", code: res.status}
    })
}

module.exports = {
    getBalance: getBalance,
    createAccount: createAccount,
    addUserBalance: addUserBalance,
    subUserBalance: subUserBalance,
    exists: exists,
    checkStatus: checkStatus
}