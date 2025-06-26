import { Controller, Get, Param, Query } from '@nestjs/common';
import { IaService } from './ia.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller('ia')
export class IaController {
  constructor(
    private readonly iaService: IaService) {}

  @Post('prestations')
  async getPrestations(@Body() body: { userRequest: string }) {
    const responsePrestations = await this.iaService.getPrestations(body.userRequest);
    return responsePrestations;
  }

  @Get('form/:id')
  async generateForm(@Param('id') id: string) {
    return await this.iaService.generateForm(id);
  }

  @Post('prestations/:id')
  async executePrestation(@Param('id') id: string, @Body() body: { form: string }) {
    return await this.iaService.makePrestation(id, body.form);
  }
}
