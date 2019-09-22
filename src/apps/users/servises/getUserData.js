import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (telegramId) => {
  const [error, data] = await to(User.findOne({ telegramId }));

  if (error) {
    throw new Error(error);
  }

  return data;
};
