module.exports = {
  config: {
    name: "leaveall",
    aliases: ["outall"],
    version: "9.0",
    author: "kylepogi",//don't change the author😤
    countDown: 6,
    role: 2,
    shortDescription: {
      en: "the bot is leaving whole groups"
    },
    longDescription: {
      en: "the bot is leaving all threads cause of the critical errors in the bot system"
    },
    category: "owner",
    guide: {
      vi: "",
      en: "example: .outall the bot automatically leave all threads with message"
    }
  },
  onStart: async function ({ api, args, message, event }) {
    try {
      const threadList = await api.getThreadList(100, null, ["INBOX"]);
      const botUserID = api.getCurrentUserID();
      for (const threadInfo of threadList) {
        if (threadInfo.isGroup && threadInfo.threadID !== event.threadID) {
          api.sendMessage('ℹ️ 𝗭𝗘𝗣𝗛 𝗡𝗢𝗧𝗜𝗙\n\nThis bot notifies that it is leaving all threads. Goodbye, everyone!', threadInfo.threadID, () => {
            api.removeUserFromGroup(botUserID, threadInfo.threadID);
          });
        }
      }
    } catch (error) {
      console.error('Error while executing leaveall command:', error);
    }
  }
};
