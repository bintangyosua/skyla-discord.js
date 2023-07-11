const { REST, Routes } = require("discord.js");
const { clientId } = require("./config.json");
require("dotenv").config();

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN || "");

// ...

// for guild-based commands
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => console.log("Successfully deleted all guild commands."))
  .catch(console.error);
