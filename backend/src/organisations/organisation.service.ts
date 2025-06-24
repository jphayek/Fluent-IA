import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Organisation } from './organisation.entity';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { User } from '../users/user.entity';

@Injectable()
export class OrganisationService implements OnModuleInit {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultOrganisations();
  }

  private async seedDefaultOrganisations() {
    const count = await this.organisationRepository.count();
    if (count > 0) {
      console.log('✅ Organisations already exist in database');
      return;
    }

    const defaultOrganisations = [
      {
        name: "TechVision AI",
        siret: "12345678901234", // SIRET français valide
        description: "Startup spécialisée dans le développement d'intelligence artificielle pour les entreprises. Nous créons des solutions IA innovantes et accessibles.",
        sector: "Technologie",
        country: "France",
        address: "123 Avenue des Champs-Élysées",
        city: "Paris",
        postalCode: "75001",
        website: "https://techvision-ai.com",
        logo: "🤖",
        isActive: true,
      },
      {
        name: "Creative Studio Digital",
        siret: "23456789012345",
        description: "Agence créative spécialisée dans le design digital, l'image de marque et les expériences utilisateur exceptionnelles.",
        sector: "Design & Créatif",
        country: "France",
        address: "45 Rue de la République",
        city: "Lyon",
        postalCode: "69002",
        website: "https://creative-studio.fr",
        logo: "🎨",
        isActive: true,
      },
      {
        name: "DataCorp Analytics",
        siret: "34567890123456",
        description: "Société de conseil en data science et analytics. Nous transformons vos données en insights actionnables pour votre business.",
        sector: "Data & Analytics",
        country: "France",
        address: "78 Boulevard Wilson",
        city: "Toulouse",
        postalCode: "31000",
        website: "https://datacorp-analytics.com",
        logo: "📊",
        isActive: true,
      },
      {
        name: "SecureNet Solutions",
        siret: "45678901234567",
        description: "Expert en cybersécurité, nous protégeons votre infrastructure numérique avec des solutions de sécurité avancées.",
        sector: "Cybersécurité",
        country: "France",
        address: "12 Rue du Molinel",
        city: "Lille",
        postalCode: "59000",
        website: "https://securenet-solutions.fr",
        logo: "🔒",
        isActive: true,
      },
      {
        name: "Mobile First Dev",
        siret: "56789012345678",
        description: "Agence spécialisée dans le développement d'applications mobiles natives et cross-platform pour iOS et Android.",
        sector: "Mobile Development",
        country: "France",
        address: "34 Quai de la Fosse",
        city: "Nantes",
        postalCode: "44000",
        website: "https://mobile-first-dev.com",
        logo: "📱",
        isActive: true,
      },
      {
        name: "VideoMax Production",
        siret: "67890123456789",
        description: "Studio de production vidéo spécialisé dans le contenu digital, publicités et films corporate de haute qualité.",
        sector: "Production Vidéo",
        country: "France",
        address: "56 La Canebière",
        city: "Marseille",
        postalCode: "13001",
        website: "https://videomax-production.fr",
        logo: "🎬",
        isActive: true,
      },
      {
        name: "CloudInfra Solutions",
        siret: "78901234567890",
        description: "Spécialiste de l'infrastructure cloud et DevOps. Nous optimisons et sécurisons vos déploiements dans le cloud.",
        sector: "Cloud & DevOps",
        country: "France",
        address: "89 Cours de l'Intendance",
        city: "Bordeaux",
        postalCode: "33000",
        website: "https://cloudinfra-solutions.com",
        logo: "☁️",
        isActive: true,
      },
      {
        name: "E-commerce Masters",
        siret: "89012345678901",
        description: "Agence spécialisée dans le développement de plateformes e-commerce performantes et l'optimisation des ventes en ligne.",
        sector: "E-commerce",
        country: "France",
        address: "23 Place Kléber",
        city: "Strasbourg",
        postalCode: "67000",
        website: "https://ecommerce-masters.fr",
        logo: "🛒",
        isActive: true,
      },
      {
        name: "GreenTech Innovations",
        siret: "90123456789012",
        description: "Startup développant des technologies vertes et solutions durables pour un avenir plus écologique.",
        sector: "GreenTech",
        country: "France",
        address: "15 Rue de la Liberté",
        city: "Grenoble",
        postalCode: "38000",
        website: "https://greentech-innovations.fr",
        logo: "🌱",
        isActive: true,
      },
      {
        name: "AI Research Lab",
        siret: "01234567890123",
        description: "Laboratoire de recherche en intelligence artificielle, pionnier dans le développement d'algorithmes d'apprentissage avancés.",
        sector: "Recherche & IA",
        country: "France",
        address: "67 Promenade des Anglais",
        city: "Nice",
        postalCode: "06000",
        website: "https://ai-research-lab.org",
        logo: "🧠",
        isActive: true,
      }
    ];

    try {
      for (const orgData of defaultOrganisations) {
        const organisation = this.organisationRepository.create(orgData);
        await this.organisationRepository.save(organisation);
      }
      console.log(`🌱 ${defaultOrganisations.length} organisations de test créées avec succès`);
    } catch (error) {
      console.error('❌ Erreur lors de la création des organisations de test:', error);
    }
  }

  async create(createOrganisationDto: CreateOrganisationDto, user: User) {
    const organisation = this.organisationRepository.create({
      ...createOrganisationDto,
      owner: user,
    });
    
    const savedOrganisation = await this.organisationRepository.save(organisation);
    return {
      success: true,
      message: 'Organisation créée avec succès',
      data: savedOrganisation
    };
  }

  async findAll() {
    const organisations = await this.organisationRepository.find({
      where: { isActive: true },
      relations: ['owner'],
      order: { createdAt: 'DESC' }
    });

    return {
      success: true,
      count: organisations.length,
      data: organisations
    };
  }

  async findOne(id: number) {
    const organisation = await this.organisationRepository.findOne({
      where: { id, isActive: true },
      relations: ['owner']
    });

    if (!organisation) {
      throw new NotFoundException('Organisation non trouvée');
    }

    return {
      success: true,
      data: organisation
    };
  }

  async findBySector(sector: string) {
    const organisations = await this.organisationRepository.find({
      where: { 
        sector: Like(`%${sector}%`),
        isActive: true 
      },
      relations: ['owner'],
      order: { createdAt: 'DESC' }
    });

    return {
      success: true,
      count: organisations.length,
      data: organisations
    };
  }

  async findByCountry(country: string) {
    const organisations = await this.organisationRepository.find({
      where: { 
        country: Like(`%${country}%`),
        isActive: true 
      },
      relations: ['owner'],
      order: { createdAt: 'DESC' }
    });

    return {
      success: true,
      count: organisations.length,
      data: organisations
    };
  }

  async findByOwner(userId: number) {
    const organisations = await this.organisationRepository.find({
      where: { 
        owner: { id: userId },
        isActive: true 
      },
      relations: ['owner'],
      order: { createdAt: 'DESC' }
    });

    return {
      success: true,
      count: organisations.length,
      data: organisations
    };
  }

  async update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    const organisation = await this.findOne(id);
    
    await this.organisationRepository.update(id, updateOrganisationDto);
    const updatedOrganisation = await this.findOne(id);

    return {
      success: true,
      message: 'Organisation mise à jour avec succès',
      data: updatedOrganisation.data
    };
  }

  async remove(id: number) {
    const organisation = await this.findOne(id);
    
    await this.organisationRepository.update(id, { isActive: false });

    return {
      success: true,
      message: 'Organisation supprimée avec succès'
    };
  }
}