'use strict';

module.exports = {
config: {
name: "botdetect",
aliases: ["botdetector"],
version: "1.0",
author: "LiANE",
countDown: 0,
role: 0,
category: "misc"
},

onStart: async function() {},

onChat: async function({ api, message, event, args, usersData, threadsData }) {
const { senderID, body, threadID } = event;

const data = await usersData.get(senderID);
const userName = data.name;
const tdata = await threadsData.get(threadID);
const threadName = tdata.threadName;

if (body.startsWith("hi") || body.startsWith("hello") ||
body.startsWith("Hello") ||
body.startsWith("Hi")) {
message.reply(`Hi to Miss/Mr. ${userName}`);

} else if (body.startsWith("Kinsay owner nmu") || body.startsWith("Sino owner mo")) {
message.reply(`Si Kyle Po
 ${userName}`);

  
} else if (body.startsWith("Sino gumawa sayo?") || body.startsWith("Kinsay naghimo nmu?")) {
message.reply(`Si lia po ata, Bakit?${userName}`);

  
} else if (body.startsWith("HAHAHA") || body.startsWith("hahaha")) {
message.reply(`Hala may baliw dito mamang guard eto eto ou ${userName}`);


} else if (body.startsWith("Kinsay pinakagwapo sa tanan kalibutan?") || body.startsWith("Sino ang pinaka gwapo sa buong mundo")) {
message.reply(`Syempre yung yung gumawa saken boba nito ou ${userName}`);


} else if (body.startsWith("Kirby") || body.startsWith("kirbs")) {
message.reply(`Bakit po? ${userName}`);


} else if (body.startsWith("Pano to") || body.startsWith("Unsa mani")) {
message.reply(`Bot or Ai po ${userName}`);

  
} else if (body.startsWith("Buang ka") || body.startsWith("Baliw amp")) {
message.reply(`Ikaw baliw, tarantado, siraulo, impakto ${userName}`);

  
} else if (body.startsWith("Good eve") || body.startsWith("Good evening")) {
message.reply(`Good eve din po ang ganda ng buwan dba? pero, mas maganda/pogi ka ${userName}`);


}
}
};
