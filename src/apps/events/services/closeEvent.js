import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (id) => {
  const [error, data] = await to(User.updateOne({ id }, { isClosed: true }));

  if (error) throw new Error(error);
  return data;
};
