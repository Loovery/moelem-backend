import { Extra } from 'telegraf';

export default (getEventMaxParticipant) => {
  const checkingInputEventData = Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([[
      m.callbackButton('Всё верно', 'allInputRight'),
      m.callbackButton('Начать ввод заново', 'needStartAgainInput'),
    ],
    [m.callbackButton('Отменить ввод', 'cancelSaveEvent')]]));

  getEventMaxParticipant.hears(/^[0-9]{0,4}$/, async (ctx) => {
    if (!ctx.session.event.maxParticipants) {
      ctx.session.event.maxParticipants = ctx.message.text;

      await ctx.scene.leave('getEventMaxParticipant');
      await ctx.scene.enter('getEventSave');

      ctx.reply(`Проверьте все данные и нажмите "Все верно" если они корректны: 
Название: ${ctx.session.event.name}
Описание: ${ctx.session.event.description}
Дата: ${ctx.session.event.date}
Место проведения: ${ctx.session.event.location} 
Максимальное число организаторов: ${ctx.session.event.maxOrganizers} 
Максимальное число участников: ${ctx.session.event.maxParticipants}`,
      checkingInputEventData);
    }
  });

  getEventMaxParticipant.on('text', async (ctx) => {
    if (!ctx.session.event.maxParticipants) {
      ctx.reply('`Ошибка ввода`\n'
        + 'Введите, сколько максимально может быть участников. (0 - если нет ограничений, -1 - если их не должно быть).',
      { parse_mode: 'markdown' });
    }
  });
};
