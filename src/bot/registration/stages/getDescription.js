import { Extra } from 'telegraf';

export default (scene) => {
  const checkingInputUserData = Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Всё верно', 'allInputRight'),
      m.callbackButton('Начать ввод заново', 'needStartAgainInput'),
    ]));

  const checkingUserData = async (ctx) => {
    await ctx.scene.leave('getDescription');
    await ctx.scene.enter('saveUserData');

    ctx.reply(`Проверьте все данные и нажмите "Все верно" если они корректны: 
*Имя:* ${ctx.session.fullname}
*Дата рождения:* ${ctx.session.birthday}
*Номер телефона:* ${ctx.session.phone}

*Табельный номер:* ${ctx.session.staffPersonalNumber}
*Должность:* ${ctx.session.jobTitle}
*Место работы:* ${ctx.session.department}

*О себе:* ${ctx.session.description}`,
    checkingInputUserData);
  };

  scene.on('text', async (ctx) => {
    ctx.session.description = ctx.message.text;

    checkingUserData(ctx);
  });
};
