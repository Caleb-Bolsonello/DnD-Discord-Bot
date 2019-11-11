const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const {Generator} = require('tiyl'); //Package Credit: https://www.npmjs.com/package/tiyl

class randCharCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'randchar',
            group: 'dungeons',
            memberName: 'randchar',
            description: 'A just for fun command that generates a random character for you to play as if you wish (includes random background). Usage: !randChar'
        });
    }

    async run(message, args)
    {
        const generator = new Generator();
        const character = generator.generate();

        const item = character.class.other.map(a => `${a.item}`);
        const siblings = character.family.siblings.map(a => `${a.siblings}`);

        var siblingStats = [];

        var i = 0;
        siblings.forEach(function(element) {
            siblingStats[i] = character.family.siblings[i].relativeAge + " that " + character.family.siblings[i].relationship + " " + character.family.siblings[i].occupation + ", " + character.family.siblings[i].status + " " + character.family.siblings[i].attitude + "\n";
            i++;
        });

        var siblingTotal = siblingStats.join("");

        var color;
        if(character.alignment == "Chaotic Evil" || character.alignment == "Neutral Evil" || character.alignment == "Lawful Evil")
        {
            color = "0xf44141";
        }
        else if(character.alignment == "Chaotic Good" || character.alignment == "Neutral Good" || character.alignment == "Lawful Good")
        {
            color = "0x4286f4";
        }
        else
        {
            color = "0xf4b942";
        }

        var townInfo = new Discord.RichEmbed()
        .setTitle("Character Template:")
        .setColor(color)
        .setThumbnail("https://i.imgur.com/mRy8fqP.jpg")
        .addField("Character Basics",
            "Race: " + character.race.name + "\n\n" +
            "SubRace: " + character.race.subrace + "\n\n" +
            "Class: " + character.class.name + "\n\n" +
            "Age: " + character.age + "\n\n" +
            "Alignment: " + character.alignment + "\n\n" +
            "Background: " + character.background.name
         )
        .addBlankField(true)
        .addField("About the Character",
            "Class Reason " + character.class.name + ": " + character.class.reason + "\n\n" +
            "Background reason " + character.background.name + ": " + character.background.reason + "\n\n" +
            "Traits: " + character.background.traits + "\n\n" +
            "Ideal: " + character.background.ideal + "\n\n" +
            "Bond: " + character.background.bond + "\n\n" + 
            "Flaw: " + character.background.flaw + "\n\n"
        )
        .addBlankField(true)
        .addField("Character Lore",
            character.class.other[0].name + ": " + character.class.other[0].value + "\n\n" +
            character.class.other[1].name + ": " + character.class.other[1].value + "\n\n" +
            character.class.other[2].name + ": " + character.class.other[2].value + "\n\n" +
            "Events: " + character.events + "\n\n" +
            "Trinket: " + character.trinket
        )
        .addBlankField(true)
        .addField("Character Family",
            "Knew Parents? " + character.family.knewParents + "\n\n" +
            "Raised By: " + character.family.raisedBy.name + "\n\n" +
            "Lifestyle: " + character.family.lifestyle.name + "\n\n" +
            "Birthplace: " + character.family.birthplace + "\n\n" +
            "Home: " + character.family.home + "\n\n" +
            "Childhood: " + character.family.childhood + "\n\n" +
            "Mother: " + "\nRace: " + character.family.parents.mother.race + "\nOccupation: " + character.family.parents.mother.occupation + "\n\n" +
            "Father: " + "\nRace: " + character.family.parents.father.race + "\nOccupation: " + character.family.parents.father.occupation + "\n\n" +
            "Siblings:\n" + siblingTotal
        )

        message.channel.send(townInfo);
    }
}

module.exports = randCharCMD;