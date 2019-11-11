const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const opendnd = require('opendnd'); //Package credit: https://github.com/opendnd/opendnd
const { Nomina, Genetica, Personae, Dominia, Dynastia } = opendnd;
var randomJs = require("random-js");

class PersonCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'person',
            group: 'dm',
            memberName: 'person',
            description: 'Randomly generates an NPC with stats and all. Colour is blue if NPC is Good, red if evil and orange if neutral. Usage: !person'
        });
    }

    async run(message, args)
    {
        const personae = new Personae();
        const person = personae.generate({
           
        });

        var searchTerm = "D&D " + person.DNA.gender + " " + person.DNA.race + " " + person.class;

        var color;
        if(person.alignment == "Chaotic Evil" || person.alignment == "Neutral Evil" || person.alignment == "Lawful Evil")
        {
            color = "0xf44141";
        }
        else if(person.alignment == "Chaotic Good" || person.alignment == "Neutral Good" || person.alignment == "Lawful Good")
        {
            color = "0x4286f4";
        }
        else
        {
            color = "0xf4b942";
        }

        var townInfo = new Discord.RichEmbed()
            .setTitle("Name: " + person.name)
            .setColor(color)
            .setThumbnail("https://i.imgur.com/mRy8fqP.jpg")
            .addField("Character Basics",
                "Race: " + person.DNA.race + "\n\n" +
                "Class: " + person.klass + "\n\n" +
                "Gender: " + person.DNA.gender + "\n\n" +
                "Age: " + person.age + "\n\n" +
                "Alignment: " + person.alignment + "\n\n" +
                "Background: " + person.background + "\n\n"
            )
            .addBlankField(true)
            .addField("About the Character",
                "Specialty: " + person.specialty + "\n\n" +
                "Personality: " + person.personalityTraits + "\n\n" +
                "Mannerism: " + person.mannerism + "\n\n" +
                "Motive: " + person.bond + "\n\n" +
                "Special Talent: " + person.talent + "\n\n" +
                "Identifying Characteristic: " + person.characteristic
            )
            .addBlankField(true)
            .addField("Character Stats",
                "Strength: " + "Score: " + person.abilities.STR.score + " | " + "Mod: " + person.abilities.STR.mod + "\n\n" +
                "Dexterity: " + "Score: " + person.abilities.DEX.score + " | " + "Mod: " + person.abilities.DEX.mod + "\n\n" +
                "Constitution: " + "Score: " + person.abilities.CON.score + " | " + "Mod: " + person.abilities.CON.mod + "\n\n" +
                "Intelligence: " + "Score: " + person.abilities.INT.score + " | " + "Mod: " + person.abilities.INT.mod + "\n\n" +
                "Wisdom: " + "Score: " + person.abilities.WIS.score + " | " + "Mod: " + person.abilities.WIS.mod + "\n\n" +
                "Charisma: " + "Score: " + person.abilities.CHA.score + " | " + "Mod: " + person.abilities.CHA.mod
            )
        
        message.author.send(townInfo);
    }
}

module.exports = PersonCMD;