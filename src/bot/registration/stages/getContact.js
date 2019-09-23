export default (scene, inlineKeyboard) => {
  scene.on('contact', async (ctx) => {
    ctx.session.phone = ctx.message.contact.phone_number
      .replace('+7', '')
      .replace(/D/g, '');
    await ctx.scene.leave('getContact');
    await ctx.scene.enter('saveUserData');
    ctx.reply(`Проверьте все данные и нажмите "Все верно" если они корректны: 
Имя: ${ctx.session.fullname}
Табельный номер: ${ctx.session.staffPersonalNumber}
Дата рождения: ${ctx.session.birthday}
О себе: ${ctx.session.description}
Номер телефона: ${ctx.session.phone}`,
    inlineKeyboard);
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
    await ctx.scene.enter('saveUserData');
    ctx.reply(
      `Проверьте все данные и нажмите "Все верно", если они корректны: 
Имя: ${ctx.session.fullname}
Табельный номер: ${ctx.session.staffPersonalNumber}
Дата рождения: ${ctx.session.birthday}
О себе: ${ctx.session.description}
Номер телефона: ${ctx.session.phone}`,
      inlineKeyboard,
    );
  });
};
