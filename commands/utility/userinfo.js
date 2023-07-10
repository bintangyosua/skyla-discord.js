const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    const avatar = interaction.member.displayAvatarURL({
      size: 1024,
      dynamic: true,
    });

    const isoTimestamp = interaction.user.createdAt;
    const date = new Date(isoTimestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const readableCreatedAccountDate = date.toLocaleString("en-US", options);

    const date2 = new Date(interaction.member.joinedTimestamp);
    const options2 = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const member = interaction.member;
    const roles = member.roles;

    // Mengambil nama-nama peran yang dimiliki pengguna
    let roleNames = roles.cache.map((role) => role.name);
    console.log(roleNames);
    roleNames = roleNames.join(", ");

    const readableJoinedDate = date2.toLocaleString("en-US", options2);

    const embedObject = {
      color: 0x0099ff,
      author: {
        name: "User Info",
        iconURL: avatar,
      },
      thumbnail: {
        url: interaction.user.displayAvatarURL({ size: 1024, dynamic: true }),
      },
      fields: [
        {
          name: "ID",
          value: interaction.member.user.id,
          inline: true,
        },
        {
          name: "Nickname",
          value: interaction.member.user.username,
          inline: true,
        },
        {
          name: "Account Created",
          value: readableCreatedAccountDate,
        },
        {
          name: "Joined Date",
          value: readableJoinedDate,
        },
        {
          name: `Roles [${roleNames.length}]`,
          value: roleNames,
        },
        {
          name: "Support us",
          value:
            "[Support Us](https://github.com/bintangyosua) to enjoy perks!",
        },
      ],
    };

    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply({ embeds: [embedObject] });
  },
};
