import { Controller, Get, Query } from '@nestjs/common';
import { IaService } from './ia.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('prestations')
  async getPrestations(@Body() body: { userRequest: string }) {
    console.log("Body :", body, body.userRequest)
    const responsePrestations = await this.iaService.getPrestations(body.userRequest);
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
