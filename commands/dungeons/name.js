var random_name = require('node-random-name'); //Package credit: https://www.npmjs.com/package/node-random-name
const Commando = require('discord.js-commando');

class NameCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'name',
            group: 'dungeons',
            memberName: 'name',
            description: 'Generates a simple random name. Usage: !name male OR !name female'
        });
    }

    async run(message, args)
    {
        var gender = String(args);
        if(gender == "") //If the user didn't enter an arg, set the arg to male
        {
            gender = "male";
        }

        if(gender == "male")
        {
            message.channel.send(random_name({ gender: "male" }));
        }
        else if(gender == "female")
        {
            message.channel.send(random_name({ gender: "female" }));
        }
    }
}

module.exports = NameCMD;