import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ 
        where: { username },
        relations: ['organisations', 'tags']
      });
      
      if (user && await bcrypt.compare(password, user.password)) {
        const { password: _, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      return null;
    }
  }

  async login(user: any) {
    return {
      user: user,
      message: 'Connexion réussie'
    };
  }

  async register(
    username: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    email: string
  ): Promise<User> {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUserByEmail = await this.userRepository.findOne({ where: { email } });
      if (existingUserByEmail) {
        throw new ConflictException('Un utilisateur avec cet email existe déjà');
      }

      const existingUserByUsername = await this.userRepository.findOne({ where: { username } });
      if (existingUserByUsername) {
        throw new ConflictException('Ce nom d\'utilisateur est déjà pris');
      }

      // Hasher le mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Créer le nouvel utilisateur
      const newUser = this.userRepository.create({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        isActive: true,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  }
}
