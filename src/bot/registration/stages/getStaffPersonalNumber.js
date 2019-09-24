export default (scene) => {
  scene.hears(/^[1-9]{1}[0-9]{0,4}$/, async (ctx) => {
    ctx.session.staffPersonalNumber = ctx.message.text;

    await ctx.scene.leave('getStaffPersonalNumber');
    await ctx.scene.enter('getJobTitle');

    ctx.reply('2. Как называется Ваша должность?', { remove_keyboard: true });
  });

  scene.on('text', async (ctx) => {
    ctx.reply('Введидте Ваш табельный номер (Только число).', { remove_keyboard: true });
  });
};
