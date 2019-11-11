const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const opendnd = require('opendnd'); //Package credit: https://github.com/opendnd/opendnd
const { Nomina, Genetica, Personae, Dominia, Dynastia } = opendnd;

class AreaCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'area',
            group: 'dm',
            memberName: 'area',
            description: 'Randomly creates an area (city, town, village or hamlet). Usage: !area or !area[city, town, village or hamlet]'
        });
    }

    async run(message, args)
    {
        var choseType = Math.floor(Math.random() * 4) + 1;
        var type = '';

        if(String(args) == "")
        {
            if(choseType == 1)
            {
                type = 'city';
            }
            else if(choseType == 2)
            {
                type = 'town';
            }
            else if(choseType == 3)
            {
                type = 'village';
            }
            else if(choseType == 4)
            {
                type = 'hamlet';
            }
        }
        else
        {
            type = String(args);
        }

        const dominia = new Dominia();
        const town = dominia.generate({
            size: type
        });

        const industry = town.demographics.industries.map(a => `${a.industry}`);
        const animal = town.demographics.livestock.map(a => `${a.animal}`);

        var townInfo = new Discord.RichEmbed()
            .setTitle("The " + type + " of: " + town.name)
            .setThumbnail("https://i.imgur.com/mRy8fqP.jpg")
            .setColor(0x00AE86)
            .setDescription(
                "Population: " + town.population.count + "\n\n" +
                "Size: " + town.size + "\n\n" +
                "Geography: "  + "Square Miles: " + town.geography.total.squaremiles + " acres: " + town.geography.total.acreage + "\n\n" +
                "Prosperity: " + town.prosperity + "\n\n" +
                "Terrain: " + town.terrain + "\n\n" +
                "Known for having: " + town.resources + "\n\n" +
                "Major Industries: " + "\n\n" + 
                industry[0] + ": " + town.demographics.industries[0].count + ", " +
                industry[1] + ": " + town.demographics.industries[1].count + ", " +
                industry[2] + ": " + town.demographics.industries[2].count + "\n\n" +
                "Livestock: " + "\n\n" + 
                animal[0] + ": " + JSON.stringify(town.demographics.livestock[0].count) + ", " + 
                animal[1] + ": " + JSON.stringify(town.demographics.livestock[1].count) + ", " +
                animal[2] + ": " + JSON.stringify(town.demographics.livestock[2].count)
            )
        
        message.author.send(townInfo);
    }
}

module.exports = AreaCMD;