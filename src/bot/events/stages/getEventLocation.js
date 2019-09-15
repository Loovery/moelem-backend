import { Extra } from 'telegraf';
import { newEvent } from '#events/servises';
import AdminControl from '#bot/admin';

export default (getEventLocation, bot) => {
  const checkingInputEventData = Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Всё верно', 'allInputRight'),
      m.callbackButton('Начать ввод заново', 'needStartAgainInput'),
    ]));

  getEventLocation.action('allInputRight', async (ctx) => {
    ctx.editMessageReplyMarkup({});


    let time = ctx.session.event.date.split('.');
    time = `${time[1]}.${time[0]}.${time[2]}`;

    const eventData = {
      name: ctx.session.event.name,
      description: ctx.session.event.description,
      time,
      location: ctx.session.event.location,
    };

    await newEvent(eventData);
    ctx.reply('Мероприятие добавлено.', { reply_markup: { remove_keyboard: true } });
    const admin = new AdminControl(bot);
    admin.sendMessageToAdmins(`Добавлено новое мероприятие:\n${ctx.session.event.name}\n${ctx.session.event.description}.`);

    await ctx.scene.leave('getEventLocation');
  });

  getEventLocation.action('needStartAgainInput', async (ctx) => {
    ctx.editMessageReplyMarkup({});
    await ctx.scene.leave('getEventLocation');
    await ctx.scene.enter('getEventName');
    ctx.reply('Введите название мероприятия.', { reply_markup: { remove_keyboard: true } });
  });

  getEventLocation.on('text', async (ctx) => {
    if (!ctx.session.event.location) {
      ctx.session.event.location = ctx.message.text;

      ctx.reply(`Проверьте все данные и нажмите "Все верно" если они корректны: 
Название: ${ctx.session.event.name}
Описание: ${ctx.session.event.description}
Дата: ${ctx.session.event.date}
Место проведения: ${ctx.session.event.location}`, checkingInputEventData);
    }
  });
};
