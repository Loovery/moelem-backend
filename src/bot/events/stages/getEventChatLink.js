export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.event.chatLink = ctx.message.text;
    ctx.reply('Введите, сколько максимально может быть организаторов. (0 - если нет ограничений, -1 - если их не должно быть)');
    await ctx.scene.leave('getEventChatLink');
    ctx.scene.enter('getEventMaxOrganizer');
  });
};
