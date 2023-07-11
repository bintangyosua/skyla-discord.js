const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const axios = require("axios");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.categories = new Collection();

require("./handlers/commands")(client);
require("./handlers/events")(client);

client.commands.forEach(async (element) => {
  element = element.data;
  if (element.nsfw === undefined) element.nsfw = false;

  await axios.put("http://localhost:3000/api/discord/commands", {
    id: element.name,
    description: element.description,
    category: element.category,
    nsfw: element.nsfw,
  });
});

client.login(process.env.DISCORD_BOT_TOKEN || "");
