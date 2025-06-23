import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async searchProfiles(@Body('text') text: string) {
    return this.searchService.findProfilesByText(text);
  }

  @Get('ping')
  ping() {
    return { message: 'search is working' };
  }
}
