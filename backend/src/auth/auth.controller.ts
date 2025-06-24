import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      const user = await this.authService.validateUser(body.username, body.password);
      
      if (!user) {
        return {
          success: false,
          message: 'Nom d\'utilisateur ou mot de passe incorrect'
        };
      }

      const loginResult = await this.authService.login(user);
      
      return {
        success: true,
        message: 'Connexion réussie',
        data: loginResult
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la connexion'
      };
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const role = registerDto.role || 'Développeur';
    
    try {
      const user = await this.authService.register(
        registerDto.username,
        registerDto.password,
        role,
        registerDto.firstName,
        registerDto.lastName,
        registerDto.email
      );

      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        message: 'Utilisateur créé avec succès',
        data: userWithoutPassword
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la création du compte'
      };
    }
  }

  @Post('validate')
  async validatePassword(@Body() body: { username: string; password: string }) {
    try {
      const user = await this.authService.validateUser(body.username, body.password);
      
      if (!user) {
        return {
          success: false,
          message: 'Nom d\'utilisateur ou mot de passe incorrect',
          valid: false
        };
      }

      return {
        success: true,
        message: 'Utilisateur validé',
        valid: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la validation',
        valid: false
      };
    }
  }
}