const Commando = require('discord.js-commando');

class FlipCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'flip',
            group: 'dungeons',
            memberName: 'flip',
            description: 'Flips a coin. (Heads or Tails). Usage: !flip'
        });
    }

    async run(message, args)
    {
        var coinFlip = Math.floor(Math.random() * 2);

        if(coinFlip == 0)
        {
            message.channel.send("Heads!");
            const headJpg = 'https://imgur.com/5RUSGlT';
            
            message.channel.send(headJpg);
        }
        else
        {
            message.channel.send("Tails!");
            const tailsJpg = 'https://imgur.com/5ALOo9H';
            message.channel.send(tailsJpg);
        }
    }
}

module.exports = FlipCMD;