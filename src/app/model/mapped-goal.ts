import { MappedUser } from './mapped-user';

export interface MappedGoal {
  address: string;
  name: string;
  description: string;
  image: string;
  owner: MappedUser;
  isOwner: boolean;
  deleted: boolean;
  target: number;
  reached: number;
  endDate: string;
  ideasNumber: number;
}
