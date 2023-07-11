const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.deferReply();
    await wait(1000);
    const sent = await interaction.editReply({
      content: "Pinging...",
      fetchReply: true,
    });
    interaction.editReply(
      `Pong 🏓 Bot latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms`
    );
  },
};
