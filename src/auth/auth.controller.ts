import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/user-role';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string; role: string }) {
    const validRoles: UserRole[] = ['Graphiste', 'Développeur', 'Monteur'];

    if (!validRoles.includes(body.role as UserRole)) {
      throw new BadRequestException('Role invalide');
    }

    const role = body.role as UserRole;

    return this.authService.register(body.username, body.password, role);
  }
}
