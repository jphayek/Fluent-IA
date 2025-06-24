import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestEntity } from './test.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(TestEntity)
    private testRepository: Repository<TestEntity>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDatabase(): Promise<any> {
    try {
      // Créer un enregistrement de test
      const testRecord = this.testRepository.create({
        message: 'Connexion à fluent_ia réussie !',
      });
      await this.testRepository.save(testRecord);

      // Compter les enregistrements
      const count = await this.testRepository.count();

      return {
        status: 'success',
        message: `Connexion à la base de données fluent_ia réussie !`,
        recordsCount: count,
        database: 'fluent_ia',
        user: 'postgres',
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Erreur de connexion : ${error.message}`,
        database: 'fluent_ia',
        user: 'postgres',
      };
    }
  }
}
