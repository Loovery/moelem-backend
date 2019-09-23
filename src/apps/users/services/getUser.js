import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (telegramIdOrStaffPersonalNumberOrFullname) => {
  const [error, data] = await to(User.findOne({
    $or: [
      { telegramId: isNaN(telegramIdOrStaffPersonalNumberOrFullname) ? 0 : telegramIdOrStaffPersonalNumberOrFullname },
      { staffPersonalNumber: isNaN(telegramIdOrStaffPersonalNumberOrFullname) ? 0 : telegramIdOrStaffPersonalNumberOrFullname },
      { fullname: telegramIdOrStaffPersonalNumberOrFullname },
    ],
  }));

  if (error) {
    throw new Error(error);
  }

  return data;
};
