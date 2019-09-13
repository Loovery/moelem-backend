export default (getBirthday) => {
  getBirthday.hears(/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/, async (ctx) => {
    ctx.session.birthday = ctx.message.text;
    ctx.reply('Расскажите немного о себе.');
    await ctx.scene.leave('getBirthday');
    ctx.scene.enter('getDescription');
  });

  getBirthday.on('text', async (ctx) => {
    ctx.reply('Введидте только год рождения в формате 01.01.1990.');
  });
};
