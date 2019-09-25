import { isUniqueField } from '#users/services';

export default async (scene) => {
  scene.hears(/^[1-9]{1}[0-9]{0,4}$/, async (ctx) => {
    if (await isUniqueField(ctx.message.text)) {
      ctx.session.staffPersonalNumber = ctx.message.text;
      await ctx.scene.leave('getStaffPersonalNumber');
      await ctx.scene.enter('getJobTitle');

      ctx.reply('2. Как называется Ваша должность?', { reply_markup: { remove_keyboard: true } });
    } else {
      ctx.reply('Данный табельный номер уже используется.\n'
        + 'Если Вы ошиблись, напишите Ваш табельный номер корректно, если нет, то свяжитесь с администратором бота или председателем молодёжки.',
      { reply_markup: { remove_keyboard: true } });
    }
  });

  scene.on('text', async (ctx) => {
    ctx.reply('Введидте Ваш табельный номер (Только число).', { reply_markup: { remove_keyboard: true } });
  });
};
