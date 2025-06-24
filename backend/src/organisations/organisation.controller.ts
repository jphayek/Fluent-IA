import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';

@Controller('organisations')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  // @UseGuards(JwtAuthGuard) // Décommentez quand l'auth sera prête
  create(@Body() createOrganisationDto: CreateOrganisationDto, @Request() req: any) {
    // Pour l'instant, simuler un utilisateur
    const mockUser = { id: 1, username: 'test' };
    return this.organisationService.create(createOrganisationDto, mockUser as any);
  }

  @Get()
  findAll() {
    return this.organisationService.findAll();
  }

  @Get('by-sector/:sector')
  findBySector(@Param('sector') sector: string) {
    return this.organisationService.findBySector(sector);
  }

  @Get('by-country/:country')
  findByCountry(@Param('country') country: string) {
    return this.organisationService.findByCountry(country);
  }

  @Get('my-organisation')
  // @UseGuards(JwtAuthGuard)
  findMyOrganisation(@Request() req: any) {
    // Pour l'instant, simuler un utilisateur
    const mockUserId = 1;
    return this.organisationService.findByOwner(mockUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organisationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganisationDto: UpdateOrganisationDto) {
    return this.organisationService.update(+id, updateOrganisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationService.remove(+id);
  }
}