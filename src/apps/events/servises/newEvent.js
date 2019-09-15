import { Event } from 'src/db/models';
import to from 'await-to-js';


const newEvent = async (data) => {
  const [errEventData, eventData] = await to(Event.create(data));

  if (errEventData) {
    throw new Error(errEventData);
  }

  return eventData;
};

export default newEvent;
