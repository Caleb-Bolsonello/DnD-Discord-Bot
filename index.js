const Commando = require('discord.js-commando');
global.tableBot = new Commando.Client;

const token = "";

tableBot.login(token);

tableBot.registry.registerGroup('dungeons', 'DnD');
tableBot.registry.registerGroup('dm', 'DM');
tableBot.registry.registerDefaults('commands')
tableBot.registry.registerCommandsIn(__dirname + '/commands');

//Writes in console when the bot is ready to be used
tableBot.on('ready', function()
{
    console.log("TableBot Discord has been enabled!");
});