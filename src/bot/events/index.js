import { Extra } from 'telegraf';
import Scene from 'telegraf/scenes/base';
import {
  stageEventName,
  stageEventDescription,
  stageEventDateAndTime,
  stageEventLocation,
  stageEventSave,
  stageEventMaxOrganizer,
  stageEventMaxParticipant,
} from '#bot/events/stages';
import {
  getEvents,
  pushOrganizerToEvent,
  pushParticipantToEvent,
  getOrganizers,
  getParticipants,
} from '#events/services';

const index = (bot, stage) => {
  const getEventName = new Scene('getEventName');
  stage.register(getEventName);
  stageEventName(getEventName);

  const getEventDescription = new Scene('getEventDescription');
  stage.register(getEventDescription);
  stageEventDescription(getEventDescription);

  const getEventDateAndTime = new Scene('getEventDateAndTime');
  stage.register(getEventDateAndTime);
  stageEventDateAndTime(getEventDateAndTime);

  const getEventLocation = new Scene('getEventLocation');
  stage.register(getEventLocation);
  stageEventLocation(getEventLocation);

  const getEventMaxOrganizer = new Scene('getEventMaxOrganizer');
  stage.register(getEventMaxOrganizer);
  stageEventMaxOrganizer(getEventMaxOrganizer);

  const getEventMaxParticipant = new Scene('getEventMaxParticipant');
  stage.register(getEventMaxParticipant);
  stageEventMaxParticipant(getEventMaxParticipant);

  const getEventSave = new Scene('getEventSave');
  stage.register(getEventSave);
  stageEventSave(getEventSave, bot);


  bot.action('eventOrganize', async (ctx) => {
    const { text } = ctx.callbackQuery.message;
    const textLines = text.split('\n');
    const eventID = textLines[1].replace('ID:', '');
    const resultPush = await pushOrganizerToEvent(eventID, ctx.session.user.id);
    if (resultPush.n > 0) {
      textLines[textLines.length - 1] = 'Вы записались на мероприятие, как организатор.';
    } else {
      textLines[textLines.length - 1] = 'Вы уже участвуйте в данноме мероприятии';
    }
    ctx.editMessageText(textLines.join('\n'));
  });

  bot.action('eventParticipant', async (ctx) => {
    const { text } = ctx.callbackQuery.message;
    const textLines = text.split('\n');
    const eventID = textLines[1].replace('ID:', '');
    const resultPush = await pushParticipantToEvent(eventID, ctx.session.user.id);
    if (resultPush.n > 0) {
      textLines[textLines.length - 1] = 'Вы записались на мероприятие, как участник.';
    } else {
      textLines[textLines.length - 1] = 'Вы уже участвуйте в мероприятии';
    }
    ctx.editMessageText(textLines.join('\n'));
  });

  bot.action('organizers', async (ctx) => {
    const { text } = ctx.callbackQuery.message;
    const textLines = text.split('\n');
    const eventID = textLines[1].replace('ID:', '');

    const data = await getOrganizers(eventID);
    const participants = data.map((item) => item.user.fullname);

    ctx.reply(`Организаторы:\n${participants.join('\n')}`);
  });

  bot.action('participants', async (ctx) => {
    const { text } = ctx.callbackQuery.message;
    const textLines = text.split('\n');
    const eventID = textLines[1].replace('ID:', '');

    const data = await getParticipants(eventID);
    const participants = data.map((item) => item.user.fullname);

    ctx.reply(`Участники:\n${participants.join('\n')}`);
  });

  bot.action('activeEvents', async (ctx) => {
    const data = await getEvents(false);
    ctx.editMessageText('Какое мероприятие Вас интересует?', Extra
      .markdown(true)
      .markup((m) => {
        const buttons = data.map((item) => [m.callbackButton(item.name, `event_${item.id}`)]);
        buttons.push([m.callbackButton('« Вернуться назад', 'events')]);

        return m.inlineKeyboard(buttons);
      }));
  });

  bot.action('myActiveEvents', async (ctx) => {
    const data = await getEvents(false, ctx.session.user.id);
    ctx.editMessageText('Какое мероприятие в котором Вы участвуйте Вас интересует?', Extra
      .markdown(true)
      .markup((m) => {
        const buttons = data.map((item) => [m.callbackButton(item.name, `event_${item.id}`)]);
        buttons.push([m.callbackButton('« Вернуться назад', 'events')]);

        return m.inlineKeyboard(buttons);
      }));
  });

  bot.action('deleteEvent', async (ctx) => {
    ctx.editMessageText('Почти удалили мероприятие\nФункция пока не работает');
  });

  bot.action('closeEvent', async (ctx) => {
    ctx.editMessageText('Почти закрыл мероприятие\nФункция пока не работает');
  });

  bot.action('newEvent', async (ctx) => {
    await ctx.scene.enter('getEventName');
    ctx.reply('Введите название мероприятия.');
  });

  bot.action('events', (ctx) => {
    let admin = false;
    if (ctx.session.user) {
      admin = ctx.session.user.admin;
    }

    ctx.editMessageText('Выберите пункт, который Вас интересует:', Extra
      .markdown()
      .markup((m) => {
        const buttons = [[
          m.callbackButton('Список мероприятий', 'activeEvents'),
          m.callbackButton('Мои мероприятия', 'myActiveEvents'),
        ]];

        if (admin) {
          buttons.push([m.callbackButton('Добавить мероприятие', 'newEvent')]);
        }

        return m.inlineKeyboard(buttons);
      }));
  });

  bot.command('events', (ctx) => {
    let admin = false;
    if (ctx.session.user) {
      admin = ctx.session.user.admin;
    }

    ctx.reply('Выберите пункт, который Вас интересует:', Extra
      .markdown()
      .markup((m) => {
        const buttons = [[
          m.callbackButton('Список мероприятий', 'activeEvents'),
          m.callbackButton('Мои мероприятия', 'myActiveEvents'),
        ]];

        if (admin) {
          buttons.push([m.callbackButton('Добавить мероприятие', 'newEvent')]);
        }

        return m.inlineKeyboard(buttons);
      }));
  });
};

export default index;
