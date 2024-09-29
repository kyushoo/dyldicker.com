const axios = require('axios');
const moment = require("moment-timezone");

const manilaTime = moment.tz('Asia/Manila');
const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

const Prefixes = [
  'zep',
  'ai',
  'Robot',
  'bot',
  'Zephyrus'
];

module.exports = {
  config: {
    name: 'ai',
    aliases: ["gpt4", "zep", "gpt3"],
    version: '2.5.4',
    author: 'Kylepogiv3',
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },

  langs: {
    en: {
      final: "Kyle's Bot",
      loading: "˚₊·͟͟͟͟͟͟͞͞͞͞͞͞➳  ⌨ ✰ 𝗭𝗘𝗣𝗛 𝗕𝗢𝗧 ⁱˢ ᵗʸᵖⁱⁿᵍ···  | ೃ࿔₊•: \n❍━━━━━━━━━━━━━━━━━━━━❏\n🕗 𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗜𝗦 𝗦𝗘𝗔𝗥𝗖𝗛𝗜𝗡𝗚 𝗬𝗢𝗨𝗥 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡 𝗣𝗟𝗘𝗔𝗦𝗘 𝗪𝗔𝗜𝗧..........\n❍━━━━━━━━━━━━━━━━━━━━❏"
    }
  },

  onStart: async function () {},

  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply("𝗛𝗲𝗹𝗹𝗼 𝗜 𝗮𝗺 𝗭𝗲𝗽𝗵𝘆𝗿𝘂𝘀 𝗽𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘆𝗼𝘂𝗿 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀....");
        return;
      }

      const loadingMessage = getLang("loading");
      const loadingReply = await message.reply(loadingMessage);
      const url = "https://hercai.onrender.com/v3/hercai"; // Replace with the new API endpoint
      const response = await axios.get(`${url}?question=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data || !response.data.reply) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.reply.trim();
      const userName = getLang("final");
      const finalMsg = `${userName}\n━━━━━━━━━━━━━━━━━━━\n🗣 Asked by: ${event.senderName}-(${event.senderID})\n❍━━━━━━━━━━━━━━━━━━━━❏\n💁🏻‍♂ ANSWER: ${messageText}\n❍━━━━━━━━━━━━━━━━━━━━❏`;

      await api.editMessage(finalMsg, loadingReply.messageID);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};
