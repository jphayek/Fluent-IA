import { Controller, Get, Query } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('generate')
  async generate(@Query('prompt') prompt: string) {
    const result = await this.iaService.generateText(prompt);
    return { result };
  }
}
