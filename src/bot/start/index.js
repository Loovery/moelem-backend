import botRegistration from '#bot/registration';
import { getUserData } from '#users/servises';

export default (bot, stage) => {
  bot.start(async (ctx) => {
    const telegramUserInfo = ctx.message.from;
    if (!telegramUserInfo.is_bot) {
      const user = ctx.session.user || await getUserData(telegramUserInfo.id);

      if (!user) {
        botRegistration(bot, stage, ctx);
      } else {
        ctx.reply(`Очень рады, что Вы вернулись, ${user.fullname}.`);
      }
    } else {
      ctx.reply('Вам тут не рады, бот.');
    }
  });
};
