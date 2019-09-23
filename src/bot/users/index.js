import { Extra } from 'telegraf';
import Scene from 'telegraf/scenes/base';
import {
  getUser,
} from '#users/services';

const index = (bot, stage) => {
  bot.command('me', (ctx) => {
    const { user } = ctx.session;

    ctx.reply(`${user.fullname}
Дата рождения: ${user.birthday}
${user.description}
Телефон: ${user.phone}
Табельный номер: ${user.staffPersonalNumber}

Был участником: [Тут будет цифра]
Был организатором: [Тут будет цифра]

Награды: [Возможно будущий функционал]

[Тут будут кнопки по редактированию информации]`);
  });


  bot.command('/user', async (ctx) => {
    const staffPersonalNumberOrFullname = ctx.message.text.split('/user')[1].trim();

    if (staffPersonalNumberOrFullname) {
      const data = await getUser(staffPersonalNumberOrFullname);
      if (data) {
        ctx.reply(`${data.fullname}
Дата рождения: ${data.birthday}
${data.description}
Телефон: ${data.phone}
Табельный номер: ${data.staffPersonalNumber}

Был участником: [Тут будет цифра]
Был организатором: [Тут будет цифра]

Награды: [Возможно будущий функционал]

[Тут будут кнопки по редактированию информации]`);
      } else {
        ctx.reply('Участник не найден.');
      }
    } else {
      ctx.reply('Вы не указали параметр поиска. Пример: "/user Ляховко Сергей" или "/user 42844".');
    }
  });
};

export default index;

