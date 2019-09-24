export default (scene) => {
  scene.on('text', async (ctx) => {
    ctx.session.jobTitle = ctx.message.text;

    await ctx.scene.leave('getJobTitle');
    await ctx.scene.enter('getDepartment');

    ctx.reply('3. Как называется Ваш отдел?');
  });
};
