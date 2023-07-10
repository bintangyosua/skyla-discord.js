const axios = require("axios");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("valo-weapon")
    .setDescription("View Valorant Weapon stats")
    .addStringOption((option) =>
      option.setName("name").setDescription("Weapon name").setRequired(true)
    ),
  async execute(interaction) {
    const response = await axios.get("https://valorant-api.com/v1/weapons");
    const option = interaction.options.getString("name");
    const data = response.data.data;
    let weapon = {};

    data.forEach((x) => {
      if (option.toLowerCase() === x.displayName.toLowerCase()) {
        weapon = x;
      }
    });

    console.log(weapon.weaponStats);
    const embed = {
      color: 0xff4f6f,
      author: {
        name: "Valorant",
        iconURL:
          "https://cdn3.vectorstock.com/i/1000x1000/37/87/valorant-game-logo-icon-eps-10-gaming-streamer-vector-33193787.jpg",
      },
      thumbnail: {
        url: weapon.displayIcon,
      },
      description: `Statistic of ${weapon.displayName}`,
      fields: [
        {
          name: "Fire Rate",
          value: `${weapon.weaponStats.fireRate}`,
          inline: true,
        },
        {
          name: "Magazine Size",
          value: `${weapon.weaponStats.magazineSize}`,
          inline: true,
        },
        {
          name: "Run Speed Multiplier",
          value: `${weapon.weaponStats.runSpeedMultiplier}`,
          inline: true,
        },
        {
          name: "Equip Time",
          value: `${weapon.weaponStats.equipTimeSeconds}s`,
          inline: true,
        },
        {
          name: "Reload Time",
          value: `${weapon.weaponStats.reloadTimeSeconds}s`,
          inline: true,
        },
        {
          name: "First Bullet Accuracy",
          value: `${weapon.weaponStats.firstBulletAccuracy}`,
          inline: true,
        },
        {
          name: "Shotgun Pellet Cound",
          value: `${weapon.weaponStats.shotgunPelletCount}`,
          inline: false,
        },
      ],
      image: {
        url: weapon.displayIcon,
      },
    };

    interaction.reply({ embeds: [embed] });
  },
};
