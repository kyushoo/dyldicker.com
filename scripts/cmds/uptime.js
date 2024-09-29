const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt", "up", "u"],
    version: "1.0",
    author: "OtinXSandip",
    role: 0,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "system",
    guide: {
      en: "Use {p}totalusers to display the total number of users of the bot and check uptime."
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `${days} days ${hours}Hrs ${minutes}min ${seconds}sec`;
      
      api.sendMessage(`[𓃵]•𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗨𝗣𝗧𝗜𝗠𝗘:\n╭┈ ❒ ⏰ | 𝗕𝗼𝘁 𝗿𝘂𝗻𝗻𝗶𝗻𝗴 𝘁𝗶𝗺𝗲\n\n╰┈❃➣  ${uptimeString}\n\n╭┈ ❒  👥 | Total Users\n╰┈❃➣  ${allUsers.length}\n\n╭┈ ❒ 🔰 | Total threads\n╰┈❃➣  ${allThreads.length}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true }); 
