import { User } from 'src/db/models';
import to from 'await-to-js';

const getAdminUsers = async () => {
  const role = 'admin';
  const [errUserData, userData] = await to(User.find({ role }));

  if (errUserData) {
    throw new Error(errUserData);
  }

  return userData;
};

export default getAdminUsers;
