import { Event } from 'src/db/models';
import to from 'await-to-js';

export default async (id) => {
  const [error, data] = await to(Event.findOne({ _id: id })
    .populate({
      path: 'participants.user',
      populate: { path: 'User' },
    }));
  if (error) { throw new Error(error); }
  return data.participants;
};
