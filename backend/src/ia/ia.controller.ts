import { Controller, Get, Query } from '@nestjs/common';
import { IaService } from './ia.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('prestations')
  async getPrestations(@Body() body: { userRequest: string }) {
    const organisations = [{
      id: "1",
      nom: "Entreprise1",
      secteur: "Informatique",
      pays: "France",
      description: "Entreprise1 vous propose des solutions informatique",
      prestations: [
        "graphiste",
        "developpeur java"
      ]
    }, {
      id: "2",
      nom: "Entreprise2",
      secteur: "Alimentaire",
      pays: "France",
      description: "Entreprise2 vous propose des services alimentaire",
      prestations: [
        "patisserie"
      ]
    }];
    const prestations = [{
      id: "1",
      nom: "graphiste",
      descriptif: "Je vous propose un service de graphiste, pour créer vos logos, toute idée créative",
      localisation: "Paris",
      physique: false,
      tags: [
        "graphiste",
        "logo"
      ]
    }, {
      id: "2",
      nom: "developpeur java",
      descriptif: "Je vous propose un service complet pour la création de vos solution informatique en java",
      localisation: "Paris",
      physique: false,
      tags: [
        "developpeur java",
        "java"
      ]
    }, {
      id: "3",
      nom: "patisserie",
      descriptif: "Je vous propose de vous faire des patisserie ansi que tout ce qui concerne boulangerie",
      localisation: "Paris",
      physique: true,
      tags: [
        "patisserie",
        "boulanger"
      ]
    }];
    const prestationIDS = await this.iaService.getPrestations(body.userRequest, organisations, prestations);
    const responsePrestations = prestations.filter(prestation =>
      prestationIDS.includes(prestation.id),
    );
    return responsePrestations;
  }

  @Get('form')
  async generateForm() {
    return this.iaService.generateForm();
  }

  /*@Post('generate')
  async generateDemand(@Body body: { prestation: any }) {
    return this.iaService;
  }*/
}
