const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { Rank } = require("canvacord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Display the current level"),
  async execute(interaction) {
    const image = interaction.user.displayAvatarURL({
      size: 1024,
      dynamic: true,
    });
    const currentXP = 0;
    const requiredXP = (Math.floor(currentXP / 500) + 1) * 500;
    const status = interaction.member.presence.status;
    const username = interaction.member.user.username;
    const level = Math.floor(currentXP / 500);
    const rank = new Rank()
      .setAvatar(image)
      .setRank(1)
      .setLevel(level)
      .setCurrentXP(currentXP)
      .setRequiredXP(requiredXP)
      .setStatus(status)
      .setProgressBar("#FFC300", "COLOR")
      .setUsername(username);

    const data = await rank.build();
    const attachment = new AttachmentBuilder(data);
    interaction.reply({ files: [attachment] });
  },
};
