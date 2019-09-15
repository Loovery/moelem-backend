import { Extra } from 'telegraf';
import Scene from 'telegraf/scenes/base';
import {
  stageEventName, stageEventDescription, stageEventDateAndTime, stageEventLocation,
} from '#bot/events/stages';
import { getEvents } from '#events/servises';

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
  stageEventLocation(getEventLocation, bot);


  bot.action('activeEvents', async (ctx) => {
    ctx.reply('activeEvents');
  });

  bot.action('myActiveEvents', (ctx) => {
    console.log(ctx.session.user.id);
    getEvents(false, ctx.session.user.id);
    ctx.reply('myActiveEvents');
  });

  bot.action('newEvent', async (ctx) => {
    await ctx.scene.enter('getEventName');
    ctx.reply('Введите название мероприятия.');
  });


  bot.command('events', (ctx) => {
    const admin = ctx.session.user.admin;

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
