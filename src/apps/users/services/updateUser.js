import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (telegramId, userData) => {
  const [error, data] = await to(User.updateOne({ telegramId }, { ...userData }));

  if (error) {
    console.log(new Error(error));
    return false;
  }

  return data;
};
