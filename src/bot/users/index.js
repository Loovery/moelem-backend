import moment from 'moment';
import {
  getUser,
} from '#users/services';

const index = (bot, stage) => {
  bot.command('me', (ctx) => {
    const { user } = ctx.session;

    if (user) {
      const birthday = moment(user.birthday);
      birthday.locale('ru');

      ctx.reply(`*${user.fullname}* - ${user.role} молодёжной организации
Родился ${birthday.format('DD.MM.YYYY, dddd')}
${user.phone}

Табельный номер: ${user.staffPersonalNumber}
${user.jobTitle}
${user.department}

${user.description}


Был участником: [Тут будет цифра]
Был организатором: [Тут будет цифра]

Награды: [Возможно будущий функционал]

[Тут будут кнопки по редактированию информации]`, { parse_mode: 'markdown' });
    } else {
      ctx.reply('У нас нет, данных по Вам. Вы можете пройти регистрацию отправив мне команду /start');
    }
  });

  bot.command('/user', async (ctx) => {
    const staffPersonalNumberOrFullname = ctx.message.text.split('/user')[1].trim();

    if (staffPersonalNumberOrFullname) {
      const data = await getUser(staffPersonalNumberOrFullname);
      if (data) {
        const birthday = moment(data.birthday);
        birthday.locale('ru');

        ctx.reply(`[${data.fullname}](tg://user?id=${data.telegramId}) - ${data.role} молодёжной организации
Родился ${birthday.format('DD.MM.YYYY')}
${data.phone}

Табельный номер: ${data.staffPersonalNumber}
${data.jobTitle || 'Должность неизвестна'}
${data.department || 'Отдел неизвестен'}

${data.description}

Был участником: [Тут будет цифра]
Был организатором: [Тут будет цифра]

Награды: [Возможно будущий функционал]

[Тут будут кнопки по редактированию информации]`, { parse_mode: 'markdown' });
      } else {
        ctx.reply('Участник не найден.');
      }
    } else {
      ctx.reply('Вы не указали параметр поиска. Пример: "/user Ляховко Сергей" или "/user 42844".');
    }
  });
};

export default index;
