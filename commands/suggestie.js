const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var seperator = "|";

    if(args[0] == null) {

        var embed = new discord.MessageEmbed()
        .setTitle("Voorbeeld")
        .setColor("#00ee00")
        .setDescription("maak een suggestie door gebruik te maken van \n !suggestie (suggestie)")
        .setTimestamp();

        message.delete();
        return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }));


    }

    var argsList = args.join(" ").split(seperator);

    var options = {

        bericht: argsList[0] || "Geen inhoud meegegeven"
    }

    var suggestieEmbed = new discord.MessageEmbed()
        .setTitle("Suggestie van " + message.author.username)
        .setDescription(`${options.bericht}`)

        var channel = message.member.guild.channels.cache.find(channel => channel.name === "📊suggesties");
        if (!channel) return message.reply("Dit kanaal bestaat niet.").then(msg => msg.delete({ timeout: 5000 }));

        message.delete();
        message.channel.send("Je hebt succesvol je suggestie aangemaakt!.").then(msg => msg.delete({timeout: 7500 }));
        channel.send(suggestieEmbed).then(MessageReaction =>{
            MessageReaction.react("👍");
            MessageReaction.react("👎");

        var suggestieL = message.member.guild.channels.cache.find(channel => channel.name === "👮bot-log");
        if(!suggestieL) return message.reply("Kanaal bestaat niet").then(msg => msg.delete({ timeout: 5000 }));

    var suggestieEmbedLog = new discord.MessageEmbed()
        .setTitle("SuggestieLog")
        .setDescription("Suggestie is gemaakt door " + message.author.username + " Bericht: \n**" + `${options.bericht}` + "**")
        .setFooter("Laat weten met 👍 of 👎 wat jij van deze suggestie vind")
        .setTimestamp();
        
        suggestieL.send(suggestieEmbedLog);
        });

}


module.exports.help = {
    name: "!suggestie"
}