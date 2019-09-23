export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.event = {
      name: ctx.message.text,
    };
    ctx.session.event.location = null;

    await ctx.scene.leave('getEventName');
    ctx.scene.enter('getEventDescription');
    ctx.reply('Введите описание мероприятия.');
  });
};
