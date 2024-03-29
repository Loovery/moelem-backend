import Scene from 'telegraf/scenes/base';
import stages from './stages';
import { registrationUser } from '#users/services';
import AdminControl from '#bot/admin';

const index = (bot, stage, startCtx) => {
  const getUserFullname = new Scene('getUserFullname');
  stage.register(getUserFullname);
  stages.getUserFullname(getUserFullname, startCtx);

  const getBirthday = new Scene('getBirthday');
  stage.register(getBirthday);
  stages.getBirthday(getBirthday);

  const getContact = new Scene('getContact');
  stage.register(getContact);
  stages.getContact(getContact);

  const getEmail = new Scene('getEmail');
  stage.register(getEmail);
  stages.getEmail(getEmail);

  const getStaffPersonalNumber = new Scene('getStaffPersonalNumber');
  stage.register(getStaffPersonalNumber);
  stages.getStaffPersonalNumber(getStaffPersonalNumber);

  const getJobTitle = new Scene('getJobTitle');
  stage.register(getJobTitle);
  stages.getJobTitle(getJobTitle);

  const getDepartment = new Scene('getDepartment');
  stage.register(getDepartment);
  stages.getDepartment(getDepartment);

  const getDescription = new Scene('getDescription');
  stage.register(getDescription);
  stages.getDescription(getDescription);

  const saveUserData = new Scene('saveUserData');
  stage.register(saveUserData);

  saveUserData.action('allInputRight', async (ctx) => {
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
        jobTitle: ctx.session.jobTitle,
        department: ctx.session.department,
        birthday,
        description: ctx.session.description,
        phone: ctx.session.phone,
        email: ctx.session.email,
      };

      await registrationUser(userData);
      const admin = new AdminControl(bot);

      admin.sendMessageToAdmins(`Новый пользователь: [${ctx.session.fullname}](tg://user?id=${telegramUserInfo.id}).`, { parse_mode: 'markdown' });

      ctx.reply('Вы успешно прошли регистрацию.', { reply_markup: { remove_keyboard: true } });
      await ctx.scene.leave('saveUserData');
    } else {
      ctx.reply('Непредвиденная ситуация, попробуйте пройти регистрацию заново, кликните на /start .', { reply_markup: { remove_keyboard: true } });
      await ctx.scene.leave('saveUserData');
    }
  });

  saveUserData.action('needStartAgainInput', (ctx) => {
    ctx.editMessageReplyMarkup({});
    ctx.reply('Ну всё пошли всё заново заводить\nВведите ваше имя и фамилия (в формате: Иван Иванов).', { reply_markup: { remove_keyboard: true } });
    ctx.scene.enter('getUserFullname');
  });
};

export default index;
