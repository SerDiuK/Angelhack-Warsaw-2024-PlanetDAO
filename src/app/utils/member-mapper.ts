import { MappedMember } from '../model/mapped-member';
import { MappedUser } from '../model/mapped-user';

export const memberMapper = (user: MappedUser, address: string): MappedMember => ({
  address: address,
  name: user.name,
  image: user.image,
  joinDate: '2024-06-16',
  votePower: 1,
  votesReceived: 12,
  donationsReceived: 27
});
