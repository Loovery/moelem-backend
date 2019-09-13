export default (getUserFullname) => {
  getUserFullname.command('start', async (ctx) => {
    ctx.reply(
      'Начнем заново. Введите Ваше имя и фамилия (в формате: Иван Иванов).',
      {
        reply_markup:
          { remove_keyboard: true },
      },
    );
    await ctx.scene.leave('getDescription');
    ctx.scene.enter('getUserFullname');
  });

  getUserFullname.on('text', async (ctx) => {
    ctx.session.fullname = ctx.message.text;
    ctx.reply('Отлично, полдела сделано.\nТеперь введите свой табельный номер.');

    await ctx.scene.leave('getUserFullname');
    ctx.scene.enter('getStaffPersonalNumber');
  });
};
