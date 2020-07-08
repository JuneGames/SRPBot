const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "730171794052481074";

    var userName = message.author.username;
    var userDisciminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {
        
        if(channel.name == userName.toLowerCase()){
            ticketBestaat = true;
            message.delete();
            message.reply("Je hebt al een ticket aangemaakt").then(msg => msg.delete({timeout: 5000 }));

            return;

        }

    });

    if (ticketBestaat) return;

    message.delete();

    var embed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.username)
        .setFooter("Support kanaal word aangemaakt")
        .setTimestamp();

        message.channel.send(embed).then(msg => msg.delete({timeout: 7500 }));

        message.guild.channels.create(userName.toLowerCase() + "-", {type: 'text'}).then(
            (createdChannel) => {
                createdChannel.setParent(categoryID).then(
                    (settedParent) => {

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false
                        });

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Support'), {
                            CREATE_INSTANT_INVITE: false,
                            READ_MESSSAGES: true,
                            SEND_MESSAGES: true,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTION: true,
                            VIEW_CHANNEL: true
                        });

                        settedParent.updateOverwrite(message.author.id, {
                            CREATE_INSTANT_INVITE: false,
                            READ_MESSSAGES: true,
                            SEND_MESSAGES: true,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTION: true
                        });

                        var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hoi ${message.author.username}`)
                        .setDescription("Zet hier je vraag")
                        .setTimestamp();

                    settedParent.send(embedParent)

                    }
                ).catch(err => {
                    message.channel.send("Gaat iets fout PM JUNEGAMES!").then(msg => msg.delete({timeout: 3000 }));
                });
            }
        ).catch(err => {
            message.channel.send("Gaat iets fout PM JUNEGAMES!").then(msg => msg.delete({timeout: 3000 }));
        });
}   

module.exports.help = {
    name: "!ticket"
}