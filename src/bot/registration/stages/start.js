import { getUserData } from 'src/apps/users/servises';

export default (bot, askAboutNameFromTelegram) => {
  bot.start(async (ctx) => {
    const telegramUserInfo = ctx.message.from;
    if (!telegramUserInfo.is_bot) {
      const telegramId = telegramUserInfo.id;

      const userData = await getUserData(telegramId);

      if (!userData) {
        const userName = telegramUserInfo.username
          || telegramUserInfo.first_name
          || telegramUserInfo.last_name;

        let fullname;
        if (telegramUserInfo.first_name && telegramUserInfo.last_name) {
          fullname = `${telegramUserInfo.first_name} ${telegramUserInfo.last_name} - это ваше имя и фамилия? `;
        }

        ctx.session.fullname = fullname && `${telegramUserInfo.first_name} ${telegramUserInfo.last_name}`;

        ctx.reply(`${userName}, добро пожаловать в молодёжку!\nПройдите небольшую регистрацию и расскажите нам о себе. \n${
          fullname}`, askAboutNameFromTelegram);
      } else {
        ctx.reply(`Очень рады, что Вы вернулись, ${userData.fullname}.`);
      }
    } else {
      ctx.reply('Вам тут не рады, бот.');
    }
  });
};
