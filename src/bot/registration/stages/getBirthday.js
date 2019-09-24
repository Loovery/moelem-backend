export default (scene) => {
  scene.hears(/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/, async (ctx) => {
    ctx.session.birthday = ctx.message.text;

    await ctx.scene.leave('getBirthday');
    await ctx.scene.enter('getContact');

    ctx.reply('Введите Ваш номер телефона или отправьте через команду "Отправить контакт".',
      {
        reply_markup:
          {
            keyboard: [[{
              text: 'Отправить контакт',
              request_contact: true,
            }]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
      });
  });

  scene.on('text', async (ctx) => {
    ctx.reply('Введидте только дату рождения (в формате дд.мм.гггг).');
  });
};
