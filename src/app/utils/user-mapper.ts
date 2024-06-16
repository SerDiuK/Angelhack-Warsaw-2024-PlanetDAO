import { UserRegistry } from '../../../typechain-types';
import { MappedUser } from '../model/mapped-user';

export const userMapper = (user: UserRegistry.UserStruct, address: string): MappedUser => ({
  address: address,
  name: user.name,
  image: user.image
});
