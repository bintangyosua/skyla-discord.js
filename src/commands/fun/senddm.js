const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("senddm")
    .setDescription("Send DM to a specified user")
    .setNSFW(true)
    .addUserOption((option) =>
      option
        .setName("userid")
        .setDescription("User ID to send")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("userid");
    const message = interaction.options.getString("message");

    try {
      const dmChannel = await user.createDM();
      await dmChannel.send(message);

      // TODO Tambahkan disini
      await interaction.reply({
        content: "Message sent successfully",
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Failed to send DM to user ${user.username}`, error);
      ("");
      await interaction.reply("An error occurred while sending the DM");
    }
  },
};
