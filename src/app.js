import Telegraf, { Extra } from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import botStart from '#bot/start';
import botEvents from '#bot/events';
import botUsers from '#bot/users';
import { loggedIn } from '#bot/middlewares';
import AdminControl from '#bot/admin';
import { getEvent } from '#events/services';

require('src/db');
require('dotenv')
  .config();

const {
  TELEGRAM_TOKEN,
} = process.env;

const { leave } = Stage;
const stage = new Stage();


const bot = new Telegraf(TELEGRAM_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.use(loggedIn);

botStart(bot, stage);
botEvents(bot, stage);
botUsers(bot, stage);

bot.command('/sendtoall', async (ctx) => {
  if (ctx.session.user.admin) {
    const text = ctx.message.text.split('/sendtoall')[1].trim();
    new AdminControl(bot).sendMessageToEveryone(text, { parse_mode: 'markdown' });
  }
});

bot.on('callback_query', async (ctx) => {
  if (ctx.callbackQuery.data.indexOf('event_') > -1) {
    const eventId = ctx.callbackQuery.data.replace('event_', '');
    const data = await getEvent(eventId);

    let admin = false;
    if (ctx.session.user) {
      admin = ctx.session.user.admin;
    }

    ctx.editMessageText(`*${data.name}*
ID:${data.id}
Описание: ${data.description}
Дата и время проведение: ${data.time}
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
  }
});


bot.on('text', async (ctx) => {
  if (ctx.session.user) {
    console.log(ctx.session.user.fullname, ctx.message.text);
  } else {
    console.log(ctx.message.from.username, ctx.message.text);
  }
  ctx.reply(' Пока ничего не работает');
});

bot.launch();
