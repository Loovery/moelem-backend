export default (getEventDateAndTime) => {
  getEventDateAndTime.hears(/^([1-9]|([012][0-9])|(3[01]))\.([0]{0,1}[1-9]|1[012])\.\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d$/,
    async (ctx) => {
      ctx.session.event.date = ctx.message.text;

      await ctx.scene.leave('getEventDateAndTime');
      ctx.scene.enter('getEventLocation');
      ctx.reply('Где будет проходить мероприятие?');
    });

  getEventDateAndTime.on('text', async (ctx) => {
    ctx.reply('Вы ввели неверный формат даты, введите дату заново.');
  });
};
