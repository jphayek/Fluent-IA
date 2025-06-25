import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OrganisationService } from '../organisations/organisation.service'; // ✅ Service

@Injectable()
export class SearchService {
  constructor(
    private usersService: UsersService,
    private organisationService: OrganisationService, // ✅ Service injecté
  ) {}

  async searchUsers(query: string): Promise<any[]> {
    const results: any[] = [];
    
    try {
      const userByUsername = await this.usersService.findByUsername(query);
      if (userByUsername) {
        const { password, ...userWithoutPassword } = userByUsername;
        results.push(userWithoutPassword);
      }

      const userByEmail = await this.usersService.findByEmail(query);
      if (userByEmail && !results.find(u => u.id === userByEmail.id)) {
        const { password, ...userWithoutPassword } = userByEmail;
        results.push(userWithoutPassword);
      }

      return results;
    } catch (error) {
      console.error('Erreur lors de la recherche d\'utilisateurs:', error);
      return [];
    }
  }

  async searchByRole(role: string): Promise<any[]> {
    try {
      const users = await this.usersService.findByRole(role);
      return users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      console.error('Erreur lors de la recherche par rôle:', error);
      return [];
    }
  }

  async searchOrganisations(query: string): Promise<any[]> {
    const results: any[] = [];
    
    try {
      const orgsBySector = await this.organisationService.findBySector(query);
      results.push(...orgsBySector.data);

      const orgsByCountry = await this.organisationService.findByCountry(query);
      orgsByCountry.data.forEach(org => {
        if (!results.find(r => r.id === org.id)) {
          results.push(org);
        }
      });

      return results;
    } catch (error) {
      console.error('Erreur lors de la recherche d\'organisations:', error);
      return [];
    }
  }

  async globalSearch(query: string): Promise<any> {
    try {
      const [users, organisations] = await Promise.all([
        this.searchUsers(query),
        this.searchOrganisations(query)
      ]);

      return {
        users,
        organisations,
        total: users.length + organisations.length
      };
    } catch (error) {
      console.error('Erreur lors de la recherche globale:', error);
      return {
        users: [],
        organisations: [],
        total: 0
      };
    }
  }
}
