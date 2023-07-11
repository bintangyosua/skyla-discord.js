const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides help on available commands"),
  async execute(interaction) {
    const username = `${interaction.client.user.username}#${interaction.client.user.discriminator}`;
    const avatar = interaction.client.user.displayAvatarURL({ size: 1024 });
    const commands = interaction.client.commands;
    let categories = [];
    commands.forEach((command) => {
      categories.push(command.data.category);
    });
    const uniqueCategories = categories.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    const arr = [];

    uniqueCategories.forEach((value) => {
      let commandList = [];
      commands.forEach((command) => {
        if (value === command.data.category) {
          commandList.push(command.data.name);
        }
      });

      const object = {
        name: value,
        value: `\`${commandList.join(", ")}\``,
        inline: true,
      };
      arr.push(object);
    });

    const embed = {
      color: 0xff4f6f,
      author: {
        name: username,
        iconURL: avatar,
      },
      thumbnail: {
        url: "https://www.pngall.com/wp-content/uploads/5/Help-PNG-Free-Download.png",
      },
      description: "Show help on available commands",
      fields: arr,
    };
    await interaction.reply({ embeds: [embed] });
  },
};
