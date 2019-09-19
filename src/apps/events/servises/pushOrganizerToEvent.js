import to from 'await-to-js';
import { Event } from '#db/models';

const pushOrganizerToEvent = async (id, userId) => {
  const [errOrganizer, userOrganizerData] = await to(Event.updateOne({
    _id: id,
    'organizers.user': { $ne: userId },
    'participants.user': { $ne: userId },
    'manager.user': { $ne: userId },
  },
  { $push: { organizers: { $each: [{ user: userId, resultOfWork: '' }] } } }));

  if (errOrganizer) throw new Error(errOrganizer);

  return userOrganizerData;
};

export default pushOrganizerToEvent;
