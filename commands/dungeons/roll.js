const Commando = require('discord.js-commando');

class RollCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'roll',
            group: 'dungeons',
            memberName: 'roll',
            description: 'Rolls whatever dice you choose. Usage: !roll[number]'
        });
    }

    async run(message, args)
    {
        var rollType = args;
        if(rollType == 0)
        {
            rollType = 6;
        }

        rollType = rollType;

        var diceRoll = Math.floor(Math.random() * rollType) + 1;
        
        message.channel.send(diceRoll + ' was rolled!');
    }
}

module.exports = RollCMD;