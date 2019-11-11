const Commando = require('discord.js-commando');
const Discord = require('discord.js');

const numOfStats = 6;
const maxRoll = 18;
const minRoll = 3;

class RollStatsCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'rollstats',
            group: 'dungeons',
            memberName: 'rollstats',
            description: 'Rolls the dice to make a new character!. Usage: !newchar'
        });
    }

    async run(message, args)
    {
        var rolls = [0, 0, 0, 0, 0, 0];

        var max = maxRoll;

        //Roll for the six stats
        for(var i = 0; i < numOfStats; i++)
        {
            rolls[i] = Math.floor(Math.random() * maxRoll) + minRoll;
        }
        
        //Display the rolls
        var charInfo = new Discord.RichEmbed()
            .addField("Rolls: \n\n", rolls[0] + "\n\n"+ rolls[1] + "\n\n"+ rolls[2] + "\n\n"+ rolls[3] + "\n\n" + rolls[4] + "\n\n" + rolls[5] + "\n")
            .setThumbnail(message.author.avatarURL)

        message.reply("");
        //message.channel.sendEmbed(charInfo);
        message.channel.send(charInfo);
    }
}

module.exports = RollStatsCMD;