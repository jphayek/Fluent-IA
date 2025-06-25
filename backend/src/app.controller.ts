import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      message: 'Fluent IA Backend is running',
      timestamp: new Date().toISOString(),
      database: 'fluent_ia',
      version: '1.0.0',
    };
  }

  @Get('info')
  getInfo() {
    return {
      app: 'Fluent IA Backend',
      description:
        "API pour la plateforme de mise en relation freelances/organisations",
      endpoints: [
        "GET / - Message d'accueil",
        'GET /health - Status de santé',
        "GET /info - Informations sur l'API",
        'GET /prestations - Liste des prestations',
        'GET /organisations - Liste des organisations',
      ],
    };
  }
}
