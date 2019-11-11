//API Credit http://www.dnd5eapi.co/
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
var axios = require("axios");

class classCMD extends Commando.Command
{
    constructor(Client)
    {
        super(Client,{
            name: 'class',
            group: 'dungeons',
            memberName: 'class',
            description: 'Seach for any class in D&D 5e for information on it!. Usage: !class [Class Name]'
        });
    }

    async run(message, args)
    {
        const spellAPI = "http://dnd5eapi.co/api/spells/?"
        var spellQuery = "name=";
        if(args != "")
        {
            //args = args.toLowerCase()
              //  .split(' ')
                //.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                //.join(' ');

            spellQuery = spellAPI + spellQuery + args;
        }

        var spellInfo;
        axios.get(spellQuery)
            .then(function (response) {
                var spellInfo = response.data.results[0].url;

                axios.get(spellInfo)
                    .then(function (response) {
                        console.log(response);

                    var measureString = String(response.data.desc);
                    if(measureString.length > 1000)
                    {
                        var strlen = (measureString.length / 2);

                        var firstPart = measureString.substr(0, strlen);
                        var secPart = measureString.substr(strlen + 1);
                        
                        var part2 = new Discord.RichEmbed()
                            .setTitle("Spell Info: " + response.data.name)
                            .setColor(0x00AE86)
                            .setThumbnail("https://i.imgur.com/CPLJlbw.png")
                            .addField("Spell Basics",
                                "Level: " + response.data.level + "\n\n" +
                                "Range: " + response.data.range + "\n\n" +
                                "Duration: " + response.data.duration + "\n\n" +
                                "Casting Time: " + response.data.casting_time + "\n\n" +
                                "Concentration: " + response.data.concentration + "\n\n" +
                                "School: " + response.data.school.name + "\n\n"
                            )
                            .setFooter("Page: " + response.data.page)    
                        
                        message.channel.send("The description is so phat it wont fit in the rich embed therefore, the description for this spell will be displayed in plain text. I am sorry, blame Discord for their outrageously small character limit for rich embeds: ");
                        message.channel.send("```" + firstPart + "```");
                        message.channel.send("```" + secPart + "```");
                        message.channel.send(part2);
                    }
                    else
                    {
                        var spellData = new Discord.RichEmbed()
                        .setTitle("Spell: " + response.data.name)
                        .setColor(0x00AE86)
                        .setThumbnail("https://i.imgur.com/CPLJlbw.png")
                        .addField("Spell Basics",
                            "Description: " + response.data.desc + "\n\n" +
                            "Level: " + response.data.level + "\n\n" +
                            "Range: " + response.data.range + "\n\n" +
                            "Duration: " + response.data.duration + "\n\n" +
                            "Casting Time: " + response.data.casting_time + "\n\n" +
                            "Concentration: " + response.data.concentration + "\n\n" +
                            "School: " + response.data.school.name + "\n\n"
                        )
                        .setFooter("Page: " + response.data.page)

                        message.channel.send(spellData);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            })
            .catch(function (error) {
                console.log(error);
        });
    }
}

module.exports = classCMD;