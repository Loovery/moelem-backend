import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (telegramId) => {
  const admin = true;
  const query = {
    admin,
  };

  if (telegramId) {
    query.telegramId = telegramId;
  }

  const [error, data] = await to(User.find(query));

  if (error) {
    throw new Error(error);
  }

  return data;
};
