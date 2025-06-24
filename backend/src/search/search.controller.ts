import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('users')
  async searchUsers(@Query('q') query: string) {
    if (!query) {
      return {
        success: false,
        message: 'Veuillez fournir un terme de recherche',
        data: []
      };
    }

    const results = await this.searchService.searchUsers(query);
    return {
      success: true,
      message: `${results.length} utilisateur(s) trouvé(s)`,
      data: results,
      count: results.length
    };
  }

  @Get('organisations')
  async searchOrganisations(@Query('q') query: string) {
    if (!query) {
      return {
        success: false,
        message: 'Veuillez fournir un terme de recherche',
        data: []
      };
    }

    const results = await this.searchService.searchOrganisations(query);
    return {
      success: true,
      message: `${results.length} organisation(s) trouvée(s)`,
      data: results,
      count: results.length
    };
  }

  @Get('role')
  async searchByRole(@Query('role') role: string) {
    if (!role) {
      return {
        success: false,
        message: 'Veuillez fournir un rôle',
        data: []
      };
    }

    const results = await this.searchService.searchByRole(role);
    return {
      success: true,
      message: `${results.length} utilisateur(s) avec le rôle ${role} trouvé(s)`,
      data: results,
      count: results.length
    };
  }

  @Get('global')
  async globalSearch(@Query('q') query: string) {
    if (!query) {
      return {
        success: false,
        message: 'Veuillez fournir un terme de recherche',
        data: { users: [], organisations: [], total: 0 }
      };
    }

    const results = await this.searchService.globalSearch(query);
    return {
      success: true,
      message: `${results.total} résultat(s) trouvé(s)`,
      data: results
    };
  }
}
