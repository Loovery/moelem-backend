import Telegraf from 'telegraf';
import session from 'telegraf/session';
import registration from 'src/bot/registration';


// import express from 'express';
import Stage from 'telegraf/stage';
import { getAdminUsers } from './apps/users/servises';

require('src/db');

// const app = express();

require('dotenv').config();

const {
  // APP_PORT,
  // LOCAL_TUNNEL,
  TELEGRAM_TOKEN,
} = process.env;


const { leave } = Stage;
const stage = new Stage();

const bot = new Telegraf(TELEGRAM_TOKEN);
bot.use(session());
bot.use(stage.middleware());

registration(bot, stage);

bot.on('text', async (ctx) => {
  const admins = await getAdminUsers();
  console.log(admins);

  ctx.reply(admins);
});

// app.use(bot.webhookCallback('/secret-path'));
// bot.telegram.setWebhook('https://server.tld:8443/secret-path');
// bot.telegram.setWebhook(LOCAL_TUNNEL);
//
// app.get('/', (req, res) => {
//   res.send(`<h1>Бот молодёжки</h1>
//   <div>
//   На данный момент реализовано: <ul>
//   <li>Минимальные настройки Бота в телеграме @MoElem_bot</li>
//   </ul>
//
//   Реализовывается: <ul>
//   <li>Команда /registration позволяющая добавлять новых пользователей</li>
//   <li>Схема БД для регистрации пользователей и раздачи ролей</li>
//   </ul>
//   </div>`);
// });

// app.listen(APP_PORT, () => {
//   console.log(`Example app listening on port ${APP_PORT}!`);
// });


bot.launch();
