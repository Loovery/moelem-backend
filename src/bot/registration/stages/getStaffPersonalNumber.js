export default (scene) => {
  scene.hears(/^[1-9]{1}[0-9]{0,4}$/, async (ctx) => {
    ctx.session.staffPersonalNumber = ctx.message.text;
    ctx.reply('А теперь дату рождения (в формате: дд.мм.гггг).');
    await ctx.scene.leave('getStaffPersonalNumber');
    ctx.scene.enter('getBirthday');
  });

  scene.on('text', async (ctx) => {
    ctx.reply('Введидте Ваш табельный номер (Только число).');
  });
};
