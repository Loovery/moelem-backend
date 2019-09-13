export default (getContact, checkingInputUserData) => {
  getContact.on('contact', async (ctx) => {
    ctx.session.phone = ctx.message.contact.phone_number.replace('+7', '');
    ctx.reply(`Проверьте все данные и нажмите "Все верно" если они корректны: 
Имя: ${ctx.session.fullname}
Табельный номер: ${ctx.session.staffPersonalNumber}
Дата рождения: ${ctx.session.birthday}
О себе: ${ctx.session.description}
Номер телефона: ${ctx.session.phone}`,
    checkingInputUserData);
    await ctx.scene.leave('getNumber');
  });

  getContact.on('text', async (ctx) => {
    let phone = ctx.message.text.replace('+7', '');

    if (phone[0] === '8' || phone[0] === '7') {
      phone = phone.split('');
      phone[0] = '';
      phone = phone.join('');
    }

    ctx.session.phone = phone;

    ctx.reply('Спасибо.', { reply_markup: { remove_keyboard: true } });
    ctx.reply(
      `Проверьте все данные и нажмите "Все верно", если они корректны: 
Имя: ${ctx.session.fullname}
Табельный номер: ${ctx.session.staffPersonalNumber}
Дата рождения: ${ctx.session.birthday}
О себе: ${ctx.session.description}
Номер телефона: ${ctx.session.phone}`,
      checkingInputUserData,
    );

    await ctx.scene.leave('getContact');
  });
};
