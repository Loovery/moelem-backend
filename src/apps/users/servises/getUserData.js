import { User } from 'src/db/models';
import to from 'await-to-js';

const getUserData = async (telegramId) => {
  const [errUserData, userData] = await to(User.findOne({ telegramId }));

  if (errUserData) {
    throw new Error(errUserData);
  }

  return userData;
};

export default getUserData;
