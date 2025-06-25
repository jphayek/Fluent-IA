import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      console.log('🔐 Tentative de connexion pour:', body.username);
      
      const user = await this.authService.validateUser(body.username, body.password);
      
      if (!user) {
        throw new HttpException(
          {
            success: false,
            message: 'Nom d\'utilisateur ou mot de passe incorrect'
          },
          HttpStatus.UNAUTHORIZED
        );
      }

      const loginResult = await this.authService.login(user);
      
      console.log('✅ Connexion réussie pour:', body.username);
      
      return {
        success: true,
        message: 'Connexion réussie',
        data: loginResult
      };
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      
      if (error.status) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Erreur lors de la connexion'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      console.log('📝 Tentative d\'inscription pour:', registerDto.username);
      
      const role = registerDto.role || 'Développeur';
      
      const user = await this.authService.register(
        registerDto.username,
        registerDto.password,
        role,
        registerDto.firstName,
        registerDto.lastName,
        registerDto.email
      );

      const { password, ...userWithoutPassword } = user;
      
      console.log('✅ Inscription réussie pour:', registerDto.username);
      
      return {
        success: true,
        message: 'Utilisateur créé avec succès',
        data: userWithoutPassword
      };
    } catch (error) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      
      if (error.status === 409) {
        throw new HttpException(
          {
            success: false,
            message: error.message
          },
          HttpStatus.CONFLICT
        );
      }
      
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Erreur lors de la création du compte'
        },
        HttpStatus.BAD_REQUEST
      );
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