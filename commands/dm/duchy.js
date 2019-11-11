const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const opendnd = require('opendnd'); //API credit: https://github.com/opendnd/opendnd
const { Nomina, Genetica, Personae, Dominia, Dynastia } = opendnd;

class DuchyCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'duchy',
            group: 'dm',
            memberName: 'duchy',
            description: 'Randomly creates a Duchy. Usage: !duchy'
        });
    }

    async run(message, args)
    {
        const dominia = new Dominia();
        const duchy = dominia.generate({
            size: 'duchy'
        });

        var duchyInfo = new Discord.RichEmbed()
            .setTitle("The Duchy of: " + duchy.name)
            .setThumbnail("https://i.imgur.com/mRy8fqP.jpg")
            .setColor(0x00AE86)
            .setDescription(
                "Population: " + duchy.population.count + "\n\n" +
                "Size: " + duchy.size + "\n\n" +
                "Geography: "  + "Square Miles: " + duchy.geography.total.squaremiles + " acres: " + duchy.geography.total.acreage + "\n\n" +
                "Prosperity: " + duchy.prosperity + "\n\n" +
                "**Major Counties:** "
            )
            .addField(duchy.demesnes[0].name,
                "Population: " + JSON.stringify(duchy.demesnes[0].population.count) + "\n" +
                "Size: " + duchy.demesnes[0].size + "\n" + 
                "Prosperity: " + duchy.demesnes[0].prosperity
            )
            .addField(duchy.demesnes[1].name,
                "Population: " + JSON.stringify(duchy.demesnes[1].population.count) + "\n" +
                "Size: " + duchy.demesnes[1].size + "\n" + 
                "Prosperity: " + duchy.demesnes[1].prosperity
            )
            .addField(duchy.demesnes[2].name,
                "Population: " + JSON.stringify(duchy.demesnes[2].population.count) + "\n" +
                "Size: " + duchy.demesnes[2].size + "\n" + 
                "Prosperity: " + duchy.demesnes[2].prosperity
            )
        
        message.author.send(duchyInfo);
    }
}

module.exports = DuchyCMD;