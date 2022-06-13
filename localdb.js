const fs = require('fs');
const { start } = require('repl');

async function getBalance(id) {
    let exists = fs.existsSync(`./database/${id}/balance`);
    if(!exists) return {success: false, message: "The user hasn't made an account on our local database."};
    let text = fs.readFileSync(`./database/${id}/balance`);
    return {success: true, balance: text}
};

async function exists(id) {
    let exists = fs.existsSync(`./database/${id}`);
    if(exists) {
        return {exists: true}
    }
    return {exists: false}
}

function createAccount(id, startingcash) {
    let exists = fs.existsSync(`./database/${id}`);
    if(exists) return {success: false, message: "The user has an account already on our local database."};
    let dirworker = fs.mkdirSync(`./database/${id}`)
    let worker = fs.writeFileSync(`./database/${id}/balance`, `${startingcash || 0}`)
    let worker1 = fs.writeFileSync(`./database/${id}/items`, ``)
    return {success: true, message: "I have created an account for the user."}
};

function setBalance(id, balance) {
    let exists = fs.existsSync(`./database/${id}/balance`);
    if(!exists) return {success: false, message: "The user hasn't made an account on our local database."};
    let worker = fs.writeFileSync(`./database/${id}/balance`, `${balance}`)
    return {success: true, message: "I have set the account's balance"}
}

async function addBalance(id, balance) {
    let exists = fs.existsSync(`./database/${id}/balance`)
    if(!exists) return {success: false, message: "The user hasn't made an account on our local database."};
    let ubal = await getBalance(id)
    let rubal = Number(ubal.balance)
    console.log((rubal + balance))
    await setBalance(id, (rubal += balance))
    return {success: true, message: "I have added the account's balance"}
}

async function subBalance(id, balance) {
    let exists = fs.existsSync(`./database/${id}/balance`)
    if(!exists) return {success: false, message: "The user hasn't made an account on our local database."};
    let ubal = await getBalance(id)
    let rubal = Number(ubal.balance)
    console.log((rubal - balance))
    await setBalance(id, (rubal - balance))
    return {success: true, message: "I have added the account's balance"}
}

function online() {
    return true
}

module.exports = {
    getBalance: getBalance,
    createAccount: createAccount,
    online: online,
    setBalance: setBalance,
    addBalance: addBalance,
    subBalance: subBalance,
    exists: exists
}