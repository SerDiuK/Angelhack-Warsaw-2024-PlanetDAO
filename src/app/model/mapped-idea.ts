import { MappedUser } from './mapped-user';

export interface MappedIdea {
  address: string;
  name: string;
  description: string;
  image: string;
  owner: MappedUser;
  isOwner: boolean;
  deleted: boolean;
  donationsTarget: number;
  donationsReceived: number;
  votesCount: number;
  isVoter: boolean;
}
