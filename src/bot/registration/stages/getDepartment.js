export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.description = ctx.message.text;
    ctx.reply('Напишите нам Вашу должность, она нам нужна чтобы отпрашивать Вас с работы.',
      { reply_markup: { remove_keyboard: true } });
    await ctx.scene.leave('getDepartment');
    ctx.scene.enter('getJobTitle');
  });
};
