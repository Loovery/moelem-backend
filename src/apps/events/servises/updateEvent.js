import { User } from 'src/db/models';
import to from 'await-to-js';


const updateEvent = async (id, data) => {
  const [errUserData, userData] = await to(User.updateOne({ id }, { ...data }));

  if (errUserData) throw new Error(errUserData);
  return userData;
};

export default updateEvent;
