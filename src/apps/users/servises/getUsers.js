import { User } from 'src/db/models';
import to from 'await-to-js';

const getUserData = async () => {
  const [errUserData, userData] = await to(User.find({}));

  if (errUserData) {
    throw new Error(errUserData);
  }

  return userData;
};

export default getUserData;
