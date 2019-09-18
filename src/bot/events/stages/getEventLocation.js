export default (getEventLocation) => {
  getEventLocation.on('text', async (ctx) => {
    ctx.session.event.location = ctx.message.text;
    ctx.reply('Введите, сколько максимально может быть организаторов. (0 - если нет ограничений, -1 - если их не должно быть)');
    await ctx.scene.leave('getEventLocation');
    ctx.scene.enter('getEventMaxOrganizer');
  });
};
