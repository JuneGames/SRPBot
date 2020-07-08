const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij mag dit nog niet doen").then(() => {

        console.log("! People are trying to clear somethings in the chat !");

    });

    if (Number.isInteger(parseInt(args[0]))) {
        
        var botclear = new discord.MessageEmbed()
        .setTitle("Berichten verwijderd.")
        .setDescription(message.author.username + ` heeft ${args[0]} berichten verwijderd`)
        .setColor("GOLD")
        .setFooter("Fijne dag!")
        .setTimestamp();

        var clearlog = new discord.MessageEmbed()
        .setTitle("ClearLog")
        .setDescription("Er zijn in **" + message.channel.name + "** Dingen verwijderd door **" + message.author.username + "**")
        .setFooter("Fijne dag!")
        .setTimestamp();

        var username = message.author.username;

        var amount = parseInt(args[0]) + 1;

        var clearlogl = message.member.guild.channels.cache.find(channel => channel.name === "👮bot-log");
        if(!clearlogl) return message.reply("Kanaal bestaat niet").then(msg => msg.delete({ timeout: 5000 }));

        message.channel.bulkDelete(amount).then(() => {

            if(args[0] <= 99) {
                message.reply(botclear).then(msg => msg.delete({ timeout: 5000 }));

                console.log(`${username} verwijderde ${args[0]} berichten`);

                clearlogl.send(clearlog);

            }

        })
    } else {

        return message.reply("Doe dit: ***!clear 1/99***.").then(msg => msg.delete({ timeout: 5000 }));

    }
}

module.exports.help = {
    name: "!clear"
}