import { getAdminUsers, getUsers } from '#users/services';

class AdminControl {
  constructor(bot) {
    this.bot = bot;
  }

  async sendMessageToAdmins(text, extraSetting) {
    const admins = await getAdminUsers();
    admins.forEach((admin) => {
      this.bot.telegram.sendMessage(
        admin.telegramId,
        `\`[Системное сообщение]\`\n${text}`,
        extraSetting,
      );
    });
  }

  async sendMessageToEveryone(text, extraSetting) {
    const users = await getUsers();
    users.forEach((user) => {
      this.bot.telegram.sendMessage(
        user.telegramId,
        `\`[Системное сообщение]\`\n${text}`,
        extraSetting,
      );
    });
  }

  async isAdmin(telegramId) {
    return await getAdminUsers(telegramId).length !== 0;
  }
}

export default AdminControl;
