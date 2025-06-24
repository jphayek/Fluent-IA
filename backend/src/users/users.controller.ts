import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  HttpStatus,
  HttpException,
  ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      // Ne pas retourner le mot de passe
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        message: 'Utilisateur créé avec succès',
        data: userWithoutPassword
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      // Retirer les mots de passe de tous les utilisateurs
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return {
        success: true,
        message: 'Utilisateurs récupérés avec succès',
        data: usersWithoutPasswords,
        count: usersWithoutPasswords.length
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Erreur lors de la récupération des utilisateurs',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('by-role/:role')
  async findByRole(@Param('role') role: string) {
    try {
      const users = await this.usersService.findByRole(role);
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return {
        success: true,
        message: `Utilisateurs avec le rôle ${role} récupérés avec succès`,
        data: usersWithoutPasswords,
        count: usersWithoutPasswords.length
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('search')
  async searchUsers(@Query('username') username?: string, @Query('email') email?: string) {
    try {
      let user;
      
      if (username) {
        user = await this.usersService.findByUsername(username);
      } else if (email) {
        user = await this.usersService.findByEmail(email);
      } else {
        throw new HttpException(
          {
            success: false,
            message: 'Veuillez fournir un username ou un email pour la recherche',
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (!user) {
        return {
          success: false,
          message: 'Utilisateur non trouvé',
          data: null
        };
      }

      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        message: 'Utilisateur trouvé',
        data: userWithoutPassword
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id);
      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        message: 'Utilisateur récupéré avec succès',
        data: userWithoutPassword
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.NOT_FOUND
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        message: 'Utilisateur mis à jour avec succès',
        data: userWithoutPassword
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id/toggle-status')
  async toggleActiveStatus(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.toggleActiveStatus(id);
      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        message: `Statut de l'utilisateur ${user.isActive ? 'activé' : 'désactivé'} avec succès`,
        data: userWithoutPassword
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usersService.remove(id);
      
      return {
        success: true,
        message: 'Utilisateur supprimé avec succès'
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.NOT_FOUND
      );
    }
  }

  @Post('validate-password')
  async validatePassword(@Body() body: { username: string; password: string }) {
    try {
      const user = await this.usersService.validatePassword(body.username, body.password);
      
      if (!user) {
        return {
          success: false,
          message: 'Nom d\'utilisateur ou mot de passe incorrect',
          valid: false
        };
      }

      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        message: 'Mot de passe valide',
        valid: true,
        data: userWithoutPassword
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id/organisation')
  async getUserOrganisation(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id);
      
      if (!user.organisation) {
        return {
          success: false,
          message: 'Cet utilisateur n\'a pas d\'organisation',
          data: null
        };
      }

      return {
        success: true,
        message: 'Organisation de l\'utilisateur récupérée avec succès',
        data: user.organisation
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.NOT_FOUND
      );
    }
  }

  @Get(':id/tags')
  async getUserTags(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id);
      
      return {
        success: true,
        message: 'Tags de l\'utilisateur récupérés avec succès',
        data: user.tags || [],
        count: user.tags?.length || 0
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.NOT_FOUND
      );
    }
  }

  @Post(':id/tags')
  async addTagsToUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { tagIds: number[] }
  ) {
    try {
      const user = await this.usersService.addTagsToUser(id, body.tagIds);
      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        message: 'Tags ajoutés à l\'utilisateur avec succès',
        data: userWithoutPassword
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }
}