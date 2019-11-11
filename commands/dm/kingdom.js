const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const opendnd = require('opendnd'); //Package credit: https://github.com/opendnd/opendnd
const { Nomina, Genetica, Personae, Dominia, Dynastia } = opendnd;

class KingdomCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'kingdom',
            group: 'dm',
            memberName: 'kingdom',
            description: 'Randomly creates a Kingdom. Usage: !kingdom'
        });
    }

    async run(message, args)
    {
        const dominia = new Dominia();
        const kingdom = dominia.generate({
            size: 'kingdom'
        });

        var kingdomInfo = new Discord.RichEmbed()
            .setTitle("The Kingdom of: " + kingdom.name)
            .setThumbnail("https://i.imgur.com/mRy8fqP.jpg")
            .setColor(0x00AE86)
            .setDescription(
                "Population: " + kingdom.population.count + "\n\n" +
                "Size: " + kingdom.size + "\n\n" +
                "Geography: "  + "Square Miles: " + kingdom.geography.total.squaremiles + " acres: " + kingdom.geography.total.acreage + "\n\n" +
                "Prosperity: " + kingdom.prosperity + "\n\n" +
                "**Major Territories:** "
            )
            .addField(kingdom.demesnes[0].name,
                "Population: " + JSON.stringify(kingdom.demesnes[0].population.count) + "\n" +
                "Size: " + kingdom.demesnes[0].size + "\n" + 
                "Prosperity: " + kingdom.demesnes[0].prosperity
            )
            .addField(kingdom.demesnes[1].name,
                "Population: " + JSON.stringify(kingdom.demesnes[1].population.count) + "\n" +
                "Size: " + kingdom.demesnes[1].size + "\n" + 
                "Prosperity: " + kingdom.demesnes[1].prosperity
            )
            .addField(kingdom.demesnes[2].name,
                "Population: " + JSON.stringify(kingdom.demesnes[2].population.count) + "\n" +
                "Size: " + kingdom.demesnes[2].size + "\n" + 
                "Prosperity: " + kingdom.demesnes[2].prosperity
            )
        
        message.author.send(kingdomInfo);
    }
}

module.exports = KingdomCMD;