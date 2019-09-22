import { Event } from 'src/db/models';
import to from 'await-to-js';

export default async (closed, userId) => {
  const query = {
    closed, // isClosed or hasClosed так как булева переменная
  };

  // if (userId) {
  //   query._id = userId;
  // }

  const [error, data] = await to(
    Event.find(query),
  );

  console.log(data);

  if (error) {
    throw new Error(error);
  }

  return data;
};
