import { Module } from '@nestjs/common';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { OrganisationService } from 'src/organisations/organisation.service';
import { PrestationService } from 'src/prestations/prestation.service';
import { OrganisationModule } from 'src/organisations/organisation.module';
import { PrestationModule } from 'src/prestations/prestation.module';

@Module({
  imports: [OrganisationModule, PrestationModule], // Import des modules
  controllers: [IaController],
  providers: [IaService],
})
export class IaModule {}
