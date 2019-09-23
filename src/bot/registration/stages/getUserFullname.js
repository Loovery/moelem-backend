import { Extra } from 'telegraf';

export default (scene, botCtx) => {
  const askAboutNameFromTelegram = Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Да', 'yesItIsMyName'),
      m.callbackButton('Нет', 'noItIsNotMyName'),
    ]));

  scene.action('yesItIsMyName', (ctx) => {
    const messageData = ctx.update.callback_query.message;
    ctx.editMessageText(`${messageData.text}\nВаш ответ: Да.`);
    ctx.reply('Отлично, полдела сделано.\nТеперь введите свой табельный номер.');
    ctx.scene.enter('getStaffPersonalNumber');
  });

  scene.action('noItIsNotMyName', (ctx) => {
    const messageData = ctx.update.callback_query.message;
    ctx.editMessageText(`${messageData.text}\nВаш ответ: Нет`);
    ctx.reply('Введите ваше имя и фамилия (в формате: Иван Иванов).');
  });

  const init = async (ctx) => {
    const telegramUserInfo = ctx.message.from;
    const userName = telegramUserInfo.username
      || telegramUserInfo.first_name
      || telegramUserInfo.last_name;

    let fullname;
    if (telegramUserInfo.first_name && telegramUserInfo.last_name) {
      fullname = `${telegramUserInfo.first_name} ${telegramUserInfo.last_name} - это ваше имя и фамилия? `;
    }

    ctx.session.fullname = fullname && `${telegramUserInfo.first_name} ${telegramUserInfo.last_name}`;

    await ctx.scene.enter('getUserFullname');

    if (fullname) {
      // ctx.reply(' d  ', {
      //   reply_markup:
      //     { remove_keyboard: true },
      // });
      ctx.reply(`${userName}, добро пожаловать. Я чат бот молодёжки!\nПройдите небольшую регистрацию и расскажите нам о себе. \n${
        fullname}`, askAboutNameFromTelegram);
    } else {
      ctx.reply(`${userName}, добро пожаловать. Я чат бот молодёжки!\nПройдите небольшую регистрацию и расскажите нам о себе. \n
Введите ваше имя и фамилия (в формате: Иван Иванов).`);
    }
  };

  scene.command('start', async (ctx) => {
    ctx.reply(
      'Начнем заново. Введите Ваше имя и фамилия (в формате: Иван Иванов).',
      {
        reply_markup:
          { remove_keyboard: true },
      },
    );

    init(ctx);
  });

  scene.on('text', async (ctx) => {
    ctx.session.fullname = ctx.message.text;
    ctx.reply('Отлично, полдела сделано.\nТеперь введите свой табельный номер.');

    await ctx.scene.leave('getUserFullname');
    ctx.scene.enter('getStaffPersonalNumber');
  });

  init(botCtx);
};
