import { MappedUser } from './mapped-user';

export interface MappedCommunity {
  address: string;
  name: string;
  description: string;
  image: string;
  subscriptionPrice: number;
  owner: MappedUser;
  isOwner: boolean;
  isMember: boolean;
  membersCount: number;
  deleted: boolean;
  startDate: string;
  brandingColor: string;
  brandingLogo: string;
}
