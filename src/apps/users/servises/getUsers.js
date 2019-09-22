import { User } from 'src/db/models';
import to from 'await-to-js';

export default async () => {
  const [error, data] = await to(User.find({}));

  if (error) {
    throw new Error(error);
  }

  return data;
};
