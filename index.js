const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("there are no files being finded.");
        return;
    }

    jsFiles.forEach((f,i) => {

        var FileGet = require(`./commands/${f}`);
        console.log(`The file ${f} is being loaded succes`)

        bot.commands.set(FileGet.help.name, FileGet);

    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("Support SRP", {type: "PLAYING"});


});

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var msg = message.content.toLowerCase();

    var scheldEmbedLog = new discord.MessageEmbed()
        .setTitle("ScheldwoordenLog")
        .setDescription(message.author.username +" Heeft gescholden in **" + message.channel.name + "**")
        .setFooter("Fijne dag!")
        .setTimestamp();

    var scheldLog = message.member.guild.channels.cache.find(channel => channel.name === "👮bot-log");
    if(!scheldLog) return message.reply("Kanaal bestaat niet").then(msg => msg.delete({ timeout: 5000 }));

    var promoteEmbedLog = new discord.MessageEmbed()
        .setTitle("PromoteLog")
        .setDescription(message.author.username +" Heeft geprobeert te promoten/reclamen in **" + message.channel.name + "**")
        .setFooter("Fijne dag!")
        .setTimestamp();

    var promoteLog = message.member.guild.channels.cache.find(channel => channel.name === "👮bot-log");
    if(!promoteLog) return message.reply("Kanaal bestaat niet").then(msg => msg.delete({ timeout: 5000 }));

    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

        if(msg.includes(swearWords["vloekwoorden"][i])) {

            message.delete();

            scheldLog.send(scheldEmbedLog);

            return message.reply("Niet schelden dankjewel, anders ben je niet welkom.").then(msg => msg.delete({timeout: 3000 }));


        }

    }

    var promote = JSON.parse(fs.readFileSync("./data/promote.json"));

    for (let i = 0; i < promote["promote"].length; i++) {

        if(msg.includes(promote["promote"][i])) {

            message.delete();

            promoteLog.send(promoteEmbedLog);

            return message.reply("Gelieve geen reclame te maken, anders ben je niet welkom.").then(msg => msg.delete({timeout: 3000 }));

        }

    }


    var commands = bot.commands.get(command.slice(prefix.length));

    if(!message.content.startsWith("!")) return;

    if(commands) commands.run(bot,message, arguments);
})

bot.login(process.env.token); 