const fs = require("node:fs");
const path = require("node:path");
const chalk = require("chalk");
require("dotenv").config();

module.exports = (client) => {
  const foldersPath = path.join(__dirname, "../commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    let categories = "";
    if (!(process.env.MODE === "development")) {
      categories = commandsPath.split("/");
    } else {
      categories = commandsPath.split("\\");
    }
    categories = categories[categories.length - 1];
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      console.log(
        `${chalk.magenta("Loading command")}: ${chalk.blue(command.data.name)}`
      );
      if ("data" in command && "execute" in command) {
        command.data.category = categories;
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
};
