const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { request } = require("undici");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Display profile information"),
  async execute(interaction) {
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "60px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(interaction.member.user.username, 250, 100);

    ctx.font = "18px Arial";
    ctx.fillStyle = "#009688";
    ctx.fillText(`ID: ${interaction.member.user.id}`, 253, 120);

    ctx.font = "18px Arial";
    ctx.fillStyle = "#555555";
    ctx.fillText(`Lived all my life on the top of mount Fuji.`, 253, 150);

    ctx.fillStyle = `#2D4356`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(75, 0);
    ctx.lineTo(250, 250);
    ctx.lineTo(0, 250);
    ctx.lineTo(0, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body } = await request(
      interaction.user.displayAvatarURL({ extension: "jpg" })
    );
    const avatar = await Canvas.loadImage(await body.arrayBuffer());
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "profile-image.png",
    });

    interaction.reply({ files: [attachment] });
  },
};
