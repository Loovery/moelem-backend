import { Extra } from 'telegraf';
import { newEvent } from '#events/servises';
import AdminControl from '#bot/admin';

export default (getEventSave, bot) => {
  const questionOfParticipation = (data) => Extra
    .markdown(true)
    .markup((m) => m.inlineKeyboard([[
      m.callbackButton('Как организатор', `eventOrganize_${data.id}`),
      m.callbackButton('Как участник', `eventParticipant_${data.id}`),
    ], [m.callbackButton('Не хочу принимать участие', 'eventNotParticipant')]]));

  bot.action('eventNotParticipant', async (ctx) => {
    const messageData = ctx.update.callback_query.message;
    ctx.editMessageText(`${messageData.text}\nВаш ответ: Нет.`, { parse_mode: 'markdown' });
  });

  getEventSave.action('allInputRight', async (ctx) => {
    const messageData = ctx.update.callback_query.message;
    ctx.editMessageText(`${messageData.text}\nМероприятие добавлено.`, { parse_mode: 'markdown' });

    let time = ctx.session.event.date.split('.');
    time = `${time[1]}.${time[0]}.${time[2]}`;

    const eventData = {
      name: ctx.session.event.name,
      description: ctx.session.event.description,
      time,
      location: ctx.session.event.location,
      maxOrganizers: ctx.session.event.maxOrganizers,
      maxParticipants: ctx.session.event.maxParticipants,
    };

    const data = await newEvent(eventData);
    const admin = new AdminControl(bot);

    let emptySlots;
    if (data.maxOrganizers !== 0 || data.maxParticipants !== 0) {
      emptySlots = '\nКоличество свободных мест:';
      if (data.maxOrganizers !== 0) {
        emptySlots += `\nОргинизаторов - ${data.maxOrganizers - data.organizers.length}`;
      }
      if (data.maxParticipants !== 0) {
        emptySlots += `\nУчастников - ${data.maxParticipants - data.participants.length}`;
      }
    }

    admin.sendMessageToAdmins(`\nДобавлено новое мероприятие:
Название: ${eventData.name}
Описание: ${eventData.description}
Дата и время проведение: ${eventData.time}
Место проведения: ${eventData.location}
${emptySlots}

Хотите быть частью мероприятия?`,
    questionOfParticipation(data));

    await ctx.scene.leave('getEventSave');
  });

  getEventSave.action('needStartAgainInput', async (ctx) => {
    ctx.editMessageReplyMarkup({});
    await ctx.scene.leave('getEventSave');
    await ctx.scene.enter('getEventName');
    ctx.reply('Введите название мероприятия.', { reply_markup: { remove_keyboard: true } });
  });

  getEventSave.action('cancelSaveEvent', async (ctx) => {
    ctx.editMessageReplyMarkup({});
    await ctx.scene.leave('getEventSave');
    ctx.reply('Ввод мероприятия отменён.', { reply_markup: { remove_keyboard: true } });
  });
};
