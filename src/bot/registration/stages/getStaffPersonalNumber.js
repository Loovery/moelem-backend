export default (getStaffPersonalNumber) => {
  getStaffPersonalNumber.hears(/^[1-9]{1}[0-9]{0,4}$/, async (ctx) => {
    ctx.session.staffPersonalNumber = ctx.message.text;
    ctx.reply('А теперь дату рождения (в формате: 01.01.1990).');
    await ctx.scene.leave('getStaffPersonalNumber');
    ctx.scene.enter('getBirthday');
  });

  getStaffPersonalNumber.on('text', async (ctx) => {
    ctx.reply('Введидте Ваш табельный номер (Только число).');
  });
};
