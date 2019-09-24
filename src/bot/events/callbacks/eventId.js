import { Extra } from 'telegraf';
import moment from 'moment';
import { getEvent } from '#events/services';

export default async (bot, ctx) => {
  const eventId = ctx.callbackQuery.data.replace('event_', '');
  const data = await getEvent(eventId);

  let admin = false;
  if (ctx.session.user) {
    admin = ctx.session.user.admin;
  }

  const time = moment(data.time);
  time.locale('ru');

  ctx.editMessageText(`*${data.name}*
ID:${data.id}
Описание: ${data.description}
Дата и время проведение: ${time.format('LLLL')}
Место проведения: ${data.location}`,
  Extra
    .markdown(true)
    .markup((m) => {
      const buttons = [[
        m.callbackButton('Организаторы', 'organizers'),
        m.callbackButton('Участники', 'participants'),
      ], [
        m.callbackButton('Стать организатором', 'eventOrganize'),
        m.callbackButton('Стать участником', 'eventParticipant'),
      ]];

      if (admin) {
        buttons.push([
          m.callbackButton('Закрыть мероприятие', 'closeEvent'),
          m.callbackButton('Удалить мероприятие', 'deleteEvent'),
        ]);
      }
      buttons.push([m.callbackButton('« Вернуться назад', 'events')]);
      return m.inlineKeyboard(buttons);
    }));
};
