import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User | null> {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}