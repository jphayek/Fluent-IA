import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('prestations')
  async getPrestations(@Body() body: { userRequest: string }) {
    try {
      const responsePrestations = await this.iaService.getPrestations(body.userRequest);
      return responsePrestations;
    } catch (err) {
      console.error('❌ Erreur dans getPrestations:', err);
      throw err;
    }
  }

  @Get('form/:id')
  async generateForm(@Param('id') id: string) {
    return await this.iaService.generateForm(id);
  }

  @Post('prestations/:id')
  async executePrestation(
    @Param('id') id: string,
    @Body() body: { form: Record<string, any> }
  ) {
    return await this.iaService.makePrestation(id, body.form);
  }
}
