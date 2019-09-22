import { Event } from 'src/db/models';
import to from 'await-to-js';

export default async (userEventData) => {
  const [error, data] = await to(Event.create(userEventData));

  if (error) {
    throw new Error(error);
  }

  return data;
};
