import { Event } from 'src/db/models';
import to from 'await-to-js';

export default async (id) => {
  const [error, data] = await to(Event.updateOne({ id }, { $set: { isClosed: true } }));

  if (error) throw new Error(error);
  return data;
};
