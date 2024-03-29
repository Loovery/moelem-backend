export default (scene) => {
  scene.on('contact', async (ctx) => {
    ctx.session.phone = ctx.message.contact.phone_number
      .replace('+7', '')
      .replace(/D/g, '');

    await ctx.scene.leave('getContact');
    await ctx.scene.enter('getEmail');

    ctx.reply('Введите Ваш электронный адрес.', { reply_markup: { remove_keyboard: true } });
  });

  scene.on('text', async (ctx) => {
    let phone = ctx.message.text.replace('+7', '')
      .replace(/D/g, '');

    if (phone[0] === '8' || phone[0] === '7') {
      phone = phone.split('');
      phone[0] = '';
      phone = phone.join('');
    }
    ctx.session.phone = phone;

    await ctx.scene.leave('getContact');
    await ctx.scene.enter('getEmail');

    ctx.reply('Введите Ваш электронный адрес.', { reply_markup: { remove_keyboard: true } });
  });
};
