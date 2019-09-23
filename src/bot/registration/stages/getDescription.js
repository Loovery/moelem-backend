export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.description = ctx.message.text;
    ctx.reply('Остался последний пункт. Нам нужен номер телефона, как можно с Вами связаться?',
      { reply_markup: { keyboard: [[{ text: '📱 Отправить контакт', request_contact: true }]], resize_keyboard: true, one_time_keyboard: true } });
    await ctx.scene.leave('getDescription');
    ctx.scene.enter('getContact');
  });
};
