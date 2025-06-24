import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organisation } from './organisation.entity';
import { User } from '../users/user.entity';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
  ) {}

  async create(createOrganisationDto: CreateOrganisationDto, owner: User): Promise<Organisation> {
    const existingOrg = await this.organisationRepository.findOne({
      where: { owner: { id: owner.id } }
    });

    if (existingOrg) {
      throw new BadRequestException('Cet utilisateur possède déjà une organisation');
    }

    const organisation = this.organisationRepository.create({
      ...createOrganisationDto,
      owner,
    });

    return this.organisationRepository.save(organisation);
  }

  async findAll(): Promise<Organisation[]> {
    return this.organisationRepository.find({
      relations: ['owner', 'prestations'],
    });
  }

  async findOne(id: number): Promise<Organisation> {
    const organisation = await this.organisationRepository.findOne({
      where: { id },
      relations: ['owner', 'prestations'],
    });

    if (!organisation) {
      throw new NotFoundException(`Organisation avec l'ID ${id} non trouvée`);
    }

    return organisation;
  }

  async findByOwner(ownerId: number): Promise<Organisation> {
    const organisation = await this.organisationRepository.findOne({
      where: { owner: { id: ownerId } },
      relations: ['owner', 'prestations'],
    });

    if (!organisation) {
      throw new NotFoundException('Aucune organisation trouvée pour cet utilisateur');
    }

    return organisation;
  }

  async update(id: number, updateOrganisationDto: UpdateOrganisationDto): Promise<Organisation> {
    await this.organisationRepository.update(id, updateOrganisationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.organisationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Organisation avec l'ID ${id} non trouvée`);
    }
  }

  async findBySector(sector: string): Promise<Organisation[]> {
    return this.organisationRepository.find({
      where: { sector },
      relations: ['owner', 'prestations'],
    });
  }

  async findByCountry(country: string): Promise<Organisation[]> {
    return this.organisationRepository.find({
      where: { country },
      relations: ['owner', 'prestations'],
    });
  }
}