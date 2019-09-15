import { getAdminUsers, getUsers } from '#users/servises';

class AdminControl {
  constructor(bot) {
    this.bot = bot;
  }

  async sendMessageToAdmins(text) {
    const admins = await getAdminUsers();
    admins.forEach((admin) => {
      this.bot.telegram.sendMessage(
        admin.telegramId,
        `\`[Системное сообщение]\`\n${text}`,
        { parse_mode: 'markdown' },
      );
    });
  }

  async sendMessageToEveryone(text) {
    const users = await getUsers();
    users.forEach((user) => {
      this.bot.telegram.sendMessage(
        user.telegramId,
        `\`[Системное сообщение]\`\n${text}`,
        { parse_mode: 'markdown' },
      );
    });
  }

  async isAdmin(telegramId) {
    return await getAdminUsers(telegramId).length !== 0;
  }
}

export default AdminControl;
