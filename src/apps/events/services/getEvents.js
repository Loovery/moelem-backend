import { Event } from 'src/db/models';
import to from 'await-to-js';

export default async (isClosed, userId) => {
  let error;
  let data;
  if (userId) {
    [error, data] = await to(Event.find({
      isClosed,
      $or: [
        { manager: { user: userId } },
        { organizers: { $elemMatch: { user: userId } } },
        { participants: { $elemMatch: { user: userId } } },
      ],
    }));
  } else {
    [error, data] = await to(Event.find({
      isClosed,
    }));
  }


  if (error) { throw new Error(error); }

  return data;
};
