import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (data) => {
  let [error, userData] = await to(User.findOne({ telegramId: data.telegramId }));

  let operation = 'create';

  if (error) {
    throw new Error(error);
  } else if (!userData) {
    [error, userData] = await to(User.create(data));
    operation = 'create';

    if (error) {
      throw new Error(error);
    }
  }
  const result = {
    // eslint-disable-next-line no-underscore-dangle
    data: userData._doc,
    type: operation,
  };

  return result;
};
