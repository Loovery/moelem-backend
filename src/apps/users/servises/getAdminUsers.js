import { User } from 'src/db/models';
import to from 'await-to-js';

const getAdminUsers = async (telegramId) => {
  const admin = true;
  const query = {
    admin,
  };

  if (telegramId) {
    query.telegramId = telegramId;
  }

  const [errUserData, userData] = await to(User.find(query));

  if (errUserData) {
    throw new Error(errUserData);
  }

  return userData;
};

export default getAdminUsers;
