import { User } from 'src/db/models';
import to from 'await-to-js';

export default async (staffPersonalNumber) => {
  const [error, data] = await to(User.findOne({ staffPersonalNumber }));

  if (error) {
    console.log(new Error(error));
    return null;
  }

  const isUnique = !data;
  return isUnique;
};
