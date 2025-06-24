import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async register(
    username: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    email: string,
  ) {
    try {
      // Utiliser la méthode 'create' du UsersService
      return await this.usersService.create({
        username,
        password,
        role,
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      // Propager l'erreur du UsersService
      throw error;
    }
  }
}
