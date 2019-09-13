import Scene from 'telegraf/scenes/base';
import { Extra } from 'telegraf';
import stages from './stages';
import { registrationUser, getAdminUsers } from '../../apps/users/servises';

const index = (bot, stage) => {
  const getUserFullname = new Scene('getUserFullname');
  stage.register(getUserFullname);

  const getStaffPersonalNumber = new Scene('getStaffPersonalNumber');
  stage.register(getStaffPersonalNumber);

  const getBirthday = new Scene('getBirthday');
  stage.register(getBirthday);

  const getEduc = new Scene('getEduc');
  stage.register(getEduc);

  const getDescription = new Scene('getDescription');
  stage.register(getDescription);

  const getContact = new Scene('getContact');
  stage.register(getContact);


  const askAboutNameFromTelegram = Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Да', 'yesItIsMyName'),
      m.callbackButton('Нет', 'noItIsNotMyName'),
    ]));

  stages.startBot(bot, askAboutNameFromTelegram);

  bot.action('yesItIsMyName', (ctx) => {
    const messageData = ctx.update.callback_query.message;
    ctx.editMessageText(`${messageData.text}\nВаш ответ: Да.`);
    ctx.reply('Отлично, полдела сделано.\nТеперь введите свой табельный номер.');
    ctx.scene.enter('getStaffPersonalNumber');
  });

  bot.action('noItIsNotMyName', (ctx) => {
    const messageData = ctx.update.callback_query.message;
    ctx.editMessageText(`${messageData.text}\nВаш ответ: Нет`);
    ctx.reply('Введите ваше имя и фамилия (в формате: Иван Иванов).');
    ctx.scene.enter('getUserFullname');
  });

  stages.getStaffPersonalNumber(getStaffPersonalNumber);
  stages.getUserFullname(getUserFullname);
  stages.getBirthday(getBirthday);
  stages.getDescription(getDescription);


  const checkingInputUserData = Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Всё верно', 'allInputRight'),
      m.callbackButton('Начать ввод заново', 'needStartAgainInput'),
    ]));

  stages.getContact(getContact, checkingInputUserData);

  bot.action('allInputRight', async (ctx) => {
    if (ctx.session.fullname) {
      ctx.editMessageReplyMarkup({});

      const telegramUserInfo = ctx.update.callback_query.from;


      let birthday = ctx.session.birthday.split('.');
      birthday = `${birthday[1]}.${birthday[0]}.${birthday[2]}`;

      const userData = {
        telegramId: telegramUserInfo.id,
        first_name: telegramUserInfo.first_name,
        last_name: telegramUserInfo.last_name,
        username: telegramUserInfo.username,
        fullname: ctx.session.fullname,
        staffPersonalNumber: ctx.session.staffPersonalNumber,
        birthday,
        description: ctx.session.description,
        phone: ctx.session.phone,
      };

      await registrationUser(userData);
      const admins = await getAdminUsers();

      admins.forEach((admin) => {
        bot.telegram.sendMessage(
          admin.telegramId,
          `Новый пользователь: [${ctx.session.fullname}](tg://user?id=${telegramUserInfo.id}).`,
          { parse_mode: 'markdown' },
        );
      });

      ctx.session = null;
      ctx.reply('Вы успешно прошли регистрацию');
    }
    ctx.scene.leave('main');
  });

  bot.action('needStartAgainInput', (ctx) => {
    ctx.editMessageReplyMarkup({});
    ctx.reply('Ну всё пошли всё заново заводить\nВведите ваше имя и фамилия (в формате: Иван Иванов).');
    ctx.scene.enter('getUserFullname');
  });
};

export default index;
