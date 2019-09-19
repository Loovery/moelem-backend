import to from 'await-to-js';
import { Event } from '#db/models';

const pushParticipantToEvent = async (id, userId) => {
  const [errParticipant, userParticipantData] = await to(Event.updateOne({
    _id: id,
    'organizers.user': { $ne: userId },
    'participants.user': { $ne: userId },
    'manager.user': { $ne: userId },
  },
  { $push: { participants: { $each: [{ user: userId, resultOfWork: '' }] } } }));

  if (errParticipant) throw new Error(errParticipant);
  return userParticipantData;
};

export default pushParticipantToEvent;
