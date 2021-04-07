const chalk = require("chalk")
const mcping = require("mcping-js")
const prompt = require("prompt-sync")({sigint: true})
const fs = require("fs")

function getDate() {
    date = new Date();
    cleanDate = date.toLocaleTimeString();
}

fs.stat("./config.json", function(err, stat) {
  if(err){
    
    const ip = prompt('Please enter the server IP: (this is case sensetive) ');
    const port = prompt("Please enter the server Port: ")
    getsetverstatus(ip, port)
    setInterval( ()=>{ getsetverstatus(ip,port); }, 30000);
}else{
    const config = require("./config.json")
    const ip = config.ip
    const port = config.port
     getsetverstatus(ip, port)
     setInterval( ()=>{ getsetverstatus(ip,port); }, 30000);
}  


},
)


function getsetverstatus(ip, port) {
    const server = new mcping.MinecraftServer(ip, port)
    
    server.ping(32000, 340, (err, res) =>  {
    const serverstatus = res.players.online + '/' + res.players.max
    const samples = res.players.sample
    const players = []
    for (const sample of samples) { 
            players.push(" " + sample.name );   
    }
    getDate()
    
    console.log(chalk.cyan('\[' + cleanDate + '\]:' ) + chalk.white(' Ping: ' + serverstatus + " Players: "+ players ) + "\n")
    })
    }