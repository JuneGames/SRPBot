const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var item = "";
    var time;
    var winnerCount;

    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit nog niet doen").then(msg => msg.delete({ timeout: 5000 }));

    var giveawayLogl = message.member.guild.channels.cache.find(channel => channel.name === "👮bot-log");
    if(!giveawayLogl) return message.reply("Kanaal bestaat niet").then(msg => msg.delete({ timeout: 5000 }));

    var giveawayLog = new discord.MessageEmbed()
    .setTitle("GiveawayLog")
    .setDescription("Giveaway is gemaakt door **" + message.author.username + "**")
    .setFooter("Fijne dag!")
    .setTimestamp();
    
    giveawayLogl.send(giveawayLog);

    winnerCount = args[0];
    time = args[1];
    item = args.splice(2,args.length).join(" ");

    message.delete();
    if(!winnerCount) return message.reply("geen aantal spelers opgegeven").then(msg => msg.delete({ timeout: 5000 }));
    if(!time) return message.reply("Geen tijd opgegeven").then(msg => msg.delete({ timeout: 5000 }));
    if (!item) return message.reply("geen winnaars item opgegeven").then(msg => msg.delete({ timeout: 5000 }));

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var giveawayEmbed = new discord.MessageEmbed()
    .setTitle("🎉 **GIVEAWAY** 🎉")
    .setFooter(`Vervalt: ${dateEnd}`)
    .setDescription(item);

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");



    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {

            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }

        }

        if (peopleReacted == 0) {
            return message.channel.send("Niemand heeft gewonnen.").then(msg => msg.delete({ timeout: 5000 }));
        }

        if (peopleReacted.length < winnerCount) {
            return message.channel.send("er zijn te weinig mensen die mee deden.").then(msg => msg.delete({ timeout: 5000 }));
        }

        for (let y = 0; y < winnerCount; y++) {

            inList =  false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; 0 < winners.length; o++) {

                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }

            }

            if (!inList) {
                winners.push(peopleReacted[random]);
            }

        }

        for (let y = 0; y < winners.length; y++) {

            message.channel.send(`Gefeliciteerd: ${winners[y]} je hebt de ***${item}*** gewonnen!, maak een ticket aan om je rewards te claimen!`);

        }

    }, time * 1000)
}

module.exports.help = {
    name: "!giveaway"
}