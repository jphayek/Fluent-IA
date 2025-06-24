import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organisation } from './organisation.entity';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { Prestation } from '../prestations/prestation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organisation, Prestation])],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [OrganisationService], // ✅ Export du service
})
export class OrganisationModule {}