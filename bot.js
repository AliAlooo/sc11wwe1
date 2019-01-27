const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();   
const giphy = require('giphy-api')();    
const googl = require('goo.gl'); 
const translate = require('google-translate-api'); 
const fs = require("fs");      
const getYoutubeID = require('get-youtube-id'); 
const moment = require("moment");  
const { Client, Util } = require('discord.js');  
const UserBlocked = new Set();  
var prefix = "."; 
const jimp = require('jimp');   
const math = require('math-expression-evaluator'); 
const stripIndents = require('common-tags').stripIndents;
const figlet = require('figlet');
const google = require('google-it'); 
const queue = new Map();
const zalgo = require('zalgolize');   
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const sql = require("sqlite");
 const dateFormat = require('dateformat');
 const pretty = require('pretty-ms') 
,ti={}  
,spee={};
const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

const prefix = "#"; // البرفكس حق البوت
const token = "";// التوكن حقك

client.on("ready", () => {
  console.log("By MASTER");

});


client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: MASTER`)
    .setColor(0xCF40FA)
    .setDescription(`اوامر البوت`)
    .addField(`Tickets`, `[${prefix}buy]() > لفتح تذكره جديده\n[${prefix}close]() > لغلق او انهاء التذكره`)
    .addField(`Other`, `[${prefix}help]() > لعرض قائمه الاوامر`)
    message.channel.send({ embed: embed });
  }


  

if (message.content.toLowerCase().startsWith(prefix + `buy`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "TIC")) return message.channel.send(`السيرفر ليس لديه رتبه \`TIC\` , لذا لن تفتح التذكره.\nيجب ان تكون لرتبه امر administrator`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`انت لديك تذكره متفوحه.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "TIC"); // اسم الرتبه 
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: تم انشاء التذكره, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`مرحبا ${message.author.username}!`, `تفضل بطلبك من ياتي احد الاداره سوف يرد على طلبك.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`لاتستطيع انجاز الامر.`);

    message.channel.send(`هل انت متأكد؟ اكتب نعم او لا !\n, اضغط \`نعم\`. سوف ينتهي الوقت خلال عشر ثواني.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'نعم', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('انتهى وقت التذكره, اليست مغلقه.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});
client.login(process.env.BOT_TOKEN);
