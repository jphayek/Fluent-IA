import { UserRole } from './user-role';

export class User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}