const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "kylepogi",
    countDown: null,
    role: 2,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const fileName = args[0];
    const permission = ["61566232924755"];
    if (!fileName) {
      return api.sendMessage("ℹ️ 𝗣𝗹𝗲𝗮𝘀𝗲 input a valid file name.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`⚠️ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗.\n\nFile not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
