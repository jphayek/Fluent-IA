import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PrestationService } from './prestation.service';

// DTOs temporaires si vous n'avez pas encore créé les fichiers
interface CreatePrestationDto {
  title: string;
  description: string;
  price?: number;
  duration?: string;
  category?: string;
  isActive?: boolean;
  tags?: string[];
}

interface UpdatePrestationDto {
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  category?: string;
  isActive?: boolean;
  tags?: string[];
}

@Controller('prestations')
export class PrestationController {
  constructor(private readonly prestationService: PrestationService) {}

  @Post()
  create(@Body() createPrestationDto: CreatePrestationDto) {
    return this.prestationService.create(createPrestationDto);
  }

  @Get()
  findAll() {
    return this.prestationService.findAll();
  }

  @Get('search')
  searchByKeywords(@Query('q') keywords: string) {
    return this.prestationService.searchByKeywords(keywords);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.prestationService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestationDto: UpdatePrestationDto) {
    return this.prestationService.update(+id, updatePrestationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestationService.remove(+id);
  }
}