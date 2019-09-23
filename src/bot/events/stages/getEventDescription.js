export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.event.description = ctx.message.text;

    await ctx.scene.leave('getEventDescription');
    ctx.scene.enter('getEventDateAndTime');
    ctx.reply('Когда будет проходить мероприятие? (дд.мм.гггг чч:мм)');
  });
};
