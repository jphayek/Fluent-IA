import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['organisation', 'tags'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['organisation', 'tags'],
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['organisation', 'tags'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['organisation', 'tags'],
    });
  }

  async findByRole(role: string): Promise<User[]> {
    return this.userRepository.find({
      where: { role },
      relations: ['organisation', 'tags'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Vérifier si l'utilisateur existe déjà
    const existingUserByUsername = await this.findByUsername(createUserDto.username);
    if (existingUserByUsername) {
      throw new ConflictException('Ce nom d\'utilisateur est déjà utilisé');
    }

    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('Cette adresse email est déjà utilisée');
    }

    // Hasher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Créer le nouvel utilisateur
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si un nouveau mot de passe est fourni, le hasher
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    // Vérifier l'unicité si username ou email changent
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findByUsername(updateUserDto.username);
      if (existingUser) {
        throw new ConflictException('Ce nom d\'utilisateur est déjà utilisé');
      }
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Cette adresse email est déjà utilisée');
      }
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
  }

  async validatePassword(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async toggleActiveStatus(id: number): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = !user.isActive;
    return this.userRepository.save(user);
  }

  async addTagsToUser(userId: number, tagIds: number[]): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tags'],
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    return user;
  }
}
