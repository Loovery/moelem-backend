export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.department = ctx.message.text;
    await ctx.scene.leave('getDepartment');
    await ctx.scene.enter('getDescription');

    ctx.reply('Почти закончили. Осталось только узнать немного о Вас, расскажите нам что-нибудь о себе.');
  });
};
