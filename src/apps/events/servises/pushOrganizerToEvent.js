import to from 'await-to-js';
import { Event } from '#db/models';

export default async (id, userId) => {
  const [error, data] = await to(Event.updateOne({
    _id: id,
    'organizers.user': { $ne: userId },
    'participants.user': { $ne: userId },
    'manager.user': { $ne: userId },
  },
  { $push: { organizers: { $each: [{ user: userId, resultOfWork: '' }] } } }));

  if (error) throw new Error(error);

  return data;
};
