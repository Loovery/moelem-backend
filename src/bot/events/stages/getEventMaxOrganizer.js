export default (scene) => {
  scene.hears(/^[0-9]{0,4}$/, async (ctx) => {
    ctx.session.event.maxOrganizers = ctx.message.text;
    ctx.reply('Введите, сколько максимально может быть участников. (0 - если нет ограничений, -1 - если их не должно быть)');
    await ctx.scene.leave('getEventMaxOrganizer');
    ctx.scene.enter('getEventMaxParticipant');
  });

  scene.on('text', async (ctx) => {
    ctx.reply('`Ошибка ввода`\n'
      + 'Введите, сколько максимально может быть организаторов. (0 - если нет ограничений, -1 - если их не должно быть).',
    { parse_mode: 'markdown' });
  });
};
