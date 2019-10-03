export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.event.location = ctx.message.text;
    ctx.reply('Введите ссылку для входа в чат.');
    await ctx.scene.leave('getEventLocation');
    ctx.scene.enter('getEventChatLink');
  });
};
