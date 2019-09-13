import { User } from 'src/db/models';
import to from 'await-to-js';


const registrationUser = async (data) => {
  let [errUserData, userData] = await to(User.findOne({ telegramId: data.telegramId }));

  let operation = 'create';

  if (errUserData) {
    throw new Error(errUserData);
  } else if (!userData) {
    [errUserData, userData] = await to(User.create(data));
    operation = 'create';

    if (errUserData) {
      throw new Error(errUserData);
    }
  }
  const result = {
    // eslint-disable-next-line no-underscore-dangle
    data: userData._doc,
    type: operation,
  };

  return result;
};

export default registrationUser;
