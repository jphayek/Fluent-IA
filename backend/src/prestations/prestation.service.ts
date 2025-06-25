import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Prestation } from './prestation.entity';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';

@Injectable()
export class PrestationService implements OnModuleInit {
  constructor(
    @InjectRepository(Prestation)
    private prestationRepository: Repository<Prestation>,
  ) {}

  async onModuleInit() {
    console.log('🔄 Initialisation du service Prestation...');
    await this.seedDefaultPrestations();
  }

  private async seedDefaultPrestations() {
    try {
      const count = await this.prestationRepository.count();
      console.log(`📊 Nombre de prestations existantes: ${count}`);
      
      if (count > 0) {
        console.log('✅ Prestations already exist in database');
        return;
      }

      console.log('🌱 Création des prestations de test...');

      const defaultPrestations = [
        {
          title: "Création de logo professionnel",
          description: "Design d'un logo moderne et mémorable pour votre marque. Incluant 3 propositions, révisions illimitées et fichiers vectoriels haute résolution.",
          category: "Design",
          price: 150.00,
          duration: "3-5 jours",
          tags: ["logo", "branding", "design", "identité visuelle", "vectoriel"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Développement site web vitrine",
          description: "Site web responsive et moderne avec CMS intégré. Design sur-mesure, optimisation SEO et hébergement inclus pour 1 an.",
          category: "Développement",
          price: 800.00,
          duration: "2-3 semaines", 
          tags: ["site web", "responsive", "cms", "seo", "hébergement"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Application mobile e-commerce",
          description: "App mobile native iOS/Android avec paiement intégré, gestion produits et interface d'administration complète.",
          category: "Mobile",
          price: 2500.00,
          duration: "6-8 semaines",
          tags: ["mobile", "ecommerce", "ios", "android", "paiement", "native"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Montage vidéo professionnel",
          description: "Montage et post-production de vos vidéos avec effets spéciaux, color grading et sound design professionnel.",
          category: "Vidéo",
          price: 300.00,
          duration: "1-2 semaines",
          tags: ["montage", "vidéo", "post-production", "effets", "color grading"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Dashboard analytics avancé",
          description: "Création d'un tableau de bord personnalisé avec visualisations interactives et rapports automatisés en temps réel.",
          category: "Data",
          price: 600.00,
          duration: "2-3 semaines",
          tags: ["dashboard", "analytics", "data", "visualisation", "rapports"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Stratégie marketing digital",
          description: "Plan marketing complet avec audit, stratégie réseaux sociaux, SEO et campagnes publicitaires ciblées.",
          category: "Marketing",
          price: 450.00,
          duration: "1-2 semaines",
          tags: ["marketing", "digital", "seo", "publicité", "réseaux sociaux"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Rédaction contenu web SEO",
          description: "Rédaction d'articles optimisés SEO, pages produits et contenu marketing pour améliorer votre visibilité en ligne.",
          category: "Rédaction",
          price: 80.00,
          duration: "3-5 jours",
          tags: ["rédaction", "seo", "contenu", "copywriting", "blog"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Interface utilisateur moderne",
          description: "Design d'interface utilisateur intuitive et moderne avec prototypage interactif et guide de style complet.",
          category: "UI/UX",
          price: 400.00,
          duration: "1-2 semaines",
          tags: ["ui", "ux", "interface", "design", "prototype", "figma"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Bot Discord personnalisé",
          description: "Développement d'un bot Discord sur-mesure avec commandes personnalisées, modération automatique et intégrations API.",
          category: "Bot",
          price: 250.00,
          duration: "1 semaine",
          tags: ["bot", "discord", "automation", "modération", "api"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Audit cybersécurité complet",
          description: "Analyse complète de la sécurité de votre infrastructure avec rapport détaillé et recommandations d'amélioration.",
          category: "Sécurité",
          price: 700.00,
          duration: "1-2 semaines",
          tags: ["sécurité", "audit", "pentesting", "cybersécurité", "vulnérabilités"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Formation développement React",
          description: "Formation complète React.js avec projets pratiques, bonnes pratiques et certification incluse. Support 30 jours.",
          category: "Formation",
          price: 500.00,
          duration: "4 semaines",
          tags: ["formation", "react", "javascript", "développement", "certification"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Consultation stratégie IT",
          description: "Conseil personnalisé pour l'optimisation de votre infrastructure IT et la définition de votre roadmap technologique.",
          category: "Consultation",
          price: 120.00,
          duration: "1-2 jours",
          tags: ["consultation", "stratégie", "it", "infrastructure", "conseil"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "API REST sécurisée",
          description: "Développement d'API REST robuste avec authentification JWT, documentation Swagger et tests automatisés.",
          category: "Développement",
          price: 450.00,
          duration: "1-3 semaines",
          tags: ["api", "rest", "backend", "jwt", "swagger", "tests"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Animation 3D personnalisée",
          description: "Création d'animations 3D sur-mesure pour vos présentations, publicités ou contenus marketing avec rendu haute qualité.",
          category: "Animation",
          price: 600.00,
          duration: "2-4 semaines",
          tags: ["animation", "3d", "rendu", "modeling", "motion graphics"],
          isActive: true,
          serviceParIa: false
        },
        {
          title: "Traduction technique multilingue",
          description: "Traduction de language par IA.",
          category: "Traduction",
          price: 35.00,
          duration: "Instantané",
          tags: ["traduction", "technique", "multilingue", "documentation", "localisation"],
          isActive: true,
          serviceParIa: true
        }
      ];

      for (const prestationData of defaultPrestations) {
        console.log(`➡️ Création de: ${prestationData.title}`);
        const prestation = this.prestationRepository.create(prestationData);
        await this.prestationRepository.save(prestation);
      }
      
      console.log(`🌱 ${defaultPrestations.length} prestations de test créées avec succès!`);
    } catch (error) {
      console.error('❌ Erreur lors de la création des prestations de test:', error);
      console.error('Stack:', error.stack);
    }
  }

  async create(createPrestationDto: CreatePrestationDto) {
    const prestation = this.prestationRepository.create(createPrestationDto);
    const savedPrestation = await this.prestationRepository.save(prestation);
    
    return {
      success: true,
      message: 'Prestation créée avec succès',
      data: savedPrestation
    };
  }

  async findAll() {
    const prestations = await this.prestationRepository.find({
      where: { isActive: true },
      order: { id: 'ASC' }
    });

    return {
      success: true,
      count: prestations.length,
      data: prestations
    };
  }

  async findOne(id: number) {
    const prestation = await this.prestationRepository.findOne({
      where: { id, isActive: true }
    });

    if (!prestation) {
      throw new NotFoundException('Prestation non trouvée');
    }

    return {
      success: true,
      data: prestation
    };
  }

  async findByCategory(category: string) {
    const prestations = await this.prestationRepository.find({
      where: { 
        category: Like(`%${category}%`),
        isActive: true 
      },
      order: { id: 'ASC' }
    });

    return {
      success: true,
      count: prestations.length,
      data: prestations
    };
  }

  async searchByKeywords(keywords: string) {
    const prestations = await this.prestationRepository.find({
      where: [
        { title: Like(`%${keywords}%`), isActive: true },
        { description: Like(`%${keywords}%`), isActive: true },
        { category: Like(`%${keywords}%`), isActive: true }
      ],
      order: { id: 'ASC' }
    });

    return {
      success: true,
      count: prestations.length,
      data: prestations,
      searchTerm: keywords
    };
  }

  async update(id: number, updatePrestationDto: UpdatePrestationDto) {
    const prestation = await this.findOne(id);
    
    await this.prestationRepository.update(id, updatePrestationDto);
    const updatedPrestation = await this.findOne(id);

    return {
      success: true,
      message: 'Prestation mise à jour avec succès',
      data: updatedPrestation.data
    };
  }

  async remove(id: number) {
    const prestation = await this.findOne(id);
    
    await this.prestationRepository.update(id, { isActive: false });

    return {
      success: true,
      message: 'Prestation supprimée avec succès'
    };
  }
}