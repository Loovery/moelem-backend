import { Event } from 'src/db/models';
import to from 'await-to-js';

const getEvents = async (closed, userId) => {
  const query = {
    closed,
  };

  // if (userId) {
  //   query._id = userId;
  // }

  const [errUserData, eventsData] = await to(
    Event.find(query),
  );

  console.log(eventsData);

  if (errUserData) {
    throw new Error(errUserData);
  }

  return eventsData;
};

export default getEvents;
