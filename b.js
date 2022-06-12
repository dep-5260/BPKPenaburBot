const fetch = require('node-fetch');

var apiKey = 'your-api-key-goes-here';
var pageId = '1lp3qbjg2g3j';
var metricId = '7m5pj3vd7sqy';
var apiBase = 'https://api.statuspage.io/v1';
 
var url = apiBase + '/pages/' + pageId + '/metrics/' + metricId + '/data.json';
var authHeader = { 'Authorization': 'OAuth ' + apiKey };
var options = { method: 'POST', headers: authHeader };

fetch(`${url}`, {
    method: 'POST',
    headers: {
        'Authorization': 'OAuth 760eac75-1f97-435e-99da-061377256320'
    }
}).then(res => {
    res.on("data", () => {
        console.log("DaTA")
    })
})