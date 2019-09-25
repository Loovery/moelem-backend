export default (scene) => {
  scene.hears(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, async (ctx) => {
    ctx.session.email = ctx.message.text;

    await ctx.scene.leave('getEmail');
    await ctx.scene.enter('getStaffPersonalNumber');

    ctx.reply('Три вещи которые нам нужны, чтобы было легче отпрашивать Вас с работы.\n1. Напишите Ваш табельный номер.', { reply_markup: { remove_keyboard: true } });
  });

  scene.on('text', async (ctx) => {
    ctx.reply('Ваш адресс не прошел проверку на email, введите другой электронный адрес.', { reply_markup: { remove_keyboard: true } });
  });
};
