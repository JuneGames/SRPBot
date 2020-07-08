const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "730171794052481074";

    if(!message.member.hasPermission("KICK_MEMBER")) return message.reply("Jij kan dit nog niet doen.").then(msg => msg.delete({timeout: 3000 }));

    if(message.channel.parentID == categoryID){
        message.channel.delete();

    var embedCloseTicket = new discord.MessageEmbed()
        .setTitle("Ticket, " + message.channel.name)
        .setDescription("Het ticket is **verholpen**.")
        .setFooter("Ticket Gesloten")
        .setTimestamp();

    var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "👮ticket-log");
    if(!ticketChannel) return message.reply("Kanaal bestaat niet").then(msg => msg.delete({timeout: 5000 }));

    ticketChannel.send(embedCloseTicket);

    } else {

        message.channel.send("Dit is geen ticket").then(msg => msg.delete({timeout: 3000 }));

    }


}   

module.exports.help = {
    name: "!close"
}