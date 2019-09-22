import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (id, userData) => {
  const [error, data] = await to(User.updateOne({ id }, { ...userData }));

  if (error) throw new Error(error);
  return data;
};
