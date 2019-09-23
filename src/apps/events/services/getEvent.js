import { Event } from 'src/db/models';
import to from 'await-to-js';

export default async (id) => {
  const [error, data] = await to(Event.findOne({ _id: id }));
  if (error) { throw new Error(error); }
  return data;
};
