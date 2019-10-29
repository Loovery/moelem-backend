import Telegraf from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import botStart from '#bot/start';
import botEvents from '#bot/events';
import { eventId } from '#bot/events/callbacks';
import botUsers from '#bot/users';
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
botUsers(bot, stage);

bot.command('/sendtoall', async (ctx) => {
  if (ctx.session.user.admin) {
    const text = ctx.message.text.split('/sendtoall')[1].trim();
    new AdminControl(bot).sendMessageToEveryone(text, { parse_mode: 'markdown' });
  }
});

bot.command('/help', async (ctx) => {
  ctx.reply(`Надеюсь я смогу Вам помочь.
Для того чтобы посмотреть мероприятия, отправьте мне команду "/events".
Для того чтобы просмотреть Вашу информацию, отправьте мне команду "/me".
Для того чтобы просмотреть информацию другого участника молодёжки, отправьте мне команду "/user" + имя и фамилия участника или табельный номер, для примера "/user 55557".
Для прохождения регистрации, отправьте мне команду "/start".`);
});

bot.on('callback_query', async (ctx) => {
  if (ctx.callbackQuery.data.indexOf('event_') > -1) {
    eventId(bot, ctx);
  }
});


bot.on('text', async (ctx) => {
  if (ctx.session.user) {
    console.log(ctx.session.user.fullname, ctx.message.text);
  } else {
    console.log(ctx.message.from.username, ctx.message.text);
  }
  ctx.reply('Неизвестная команда, напишите /help для справки', { reply_markup: { remove_keyboard: true } });
});

bot.launch();
