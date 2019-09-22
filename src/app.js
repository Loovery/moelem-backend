import Telegraf, { Extra } from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import botStart from '#bot/start';
import botEvents from '#bot/events';
import { loggedIn } from '#bot/middlewares';
import AdminControl from '#bot/admin';

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

bot.command('/sendtoall', async (ctx) => {
  if (ctx.session.user.admin) {
    const text = ctx.message.text.split('/sendtoall')[1].trim();
    new AdminControl(bot).sendMessageToEveryone(text, { parse_mode: 'markdown' });
  }
});

// bot.on('callback_query', (ctx) => {
//   console.log(ctx.callbackQuery.data);
//   console.log(ctx.callbackQuery.message.text);
//   ctx.reply(' callback_query');
// });


bot.on('text', async (ctx) => {
  if (ctx.session.user) {
    console.log(ctx.session.user.fullname, ctx.message.text);
  } else {
    console.log(ctx.message.from.username, ctx.message.text);
  }
  ctx.reply(' Пока ничего не работает');
});

bot.launch();
