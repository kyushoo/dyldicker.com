const moment = require('moment-timezone');
const axios = require('axios');

module.exports.config = {
    name: "autofact",
    version: "1.0.0",
    role: 0,
    credits: "kylepogi",
    description: "Get a random fact.",
    hasPrefix: false,
    aliases: ["fact", "randomfact"],
    usage: "",
    cooldown: 5,
};

module.exports.onLoad = async ({ api, event }) => {
    const res = await axios.get('https://api.popcat.xyz/fact');
    const fact = res.data.fact;

    // Send the random fact message
    return api.sendMessage(`🔔 𝙰𝚞𝚝𝚘 𝚁𝚊𝚗𝚍𝚘𝚖-𝚏𝚊𝚌𝚝\n\nDid you know? ${fact}`, event.threadID, event.messageID);
};

const checkTimeAndSendMessage = async (api) => {
    const now = moment().tz('Asia/Manila');
    const currentTime = now.format('HH:mm:ss'); // 24-hour format for consistency

    // Send a message with the current time (adjust this as needed)
    const message = `Current time is: ${currentTime}`;
    
    const threadIDs = global.db.allThreadData.map(i => i.threadID);
    threadIDs.forEach(threadID => {
        api.sendMessage(message, threadID);
    });

    // Schedule the next check
    const nextMinute = moment().add(1, 'minute').startOf('minute');
    const delay = nextMinute.diff(moment());
    setTimeout(() => checkTimeAndSendMessage(api), delay);
};

module.exports.onStart = (api) => {
    console.log(`${module.exports.config.name} module started!`);
    checkTimeAndSendMessage(api);
};
