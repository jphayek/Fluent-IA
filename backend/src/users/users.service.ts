import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRole } from './user-role';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'alice', password: '1234', role: 'Graphiste' },
    { id: 2, username: 'bob', password: '1234', role: 'Développeur' },
    { id: 3, username: 'carla', password: '1234', role: 'Monteur' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findByRole(role: string): User[] {
    return this.users.filter(u => u.role === role);
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }

  async createUser(user: { username: string; password: string; role: UserRole }): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  
}
