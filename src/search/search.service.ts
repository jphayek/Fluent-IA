import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity'; 

@Injectable()
export class SearchService {
  constructor(private usersService: UsersService) {}

  private keywordRoleMap = new Map<string, string>([
    ['logo', 'Graphiste'],
    ['burger', 'Graphiste'],
    ['site', 'Développeur'],
    ['développer', 'Développeur'],
    ['monter', 'Monteur'],
    ['vidéo', 'Monteur'],
  ]);

  findProfilesByText(text: string): User[] {
    const lowerText = text.toLowerCase();

    const matchedRoles = new Set<string>();
    for (const [keyword, role] of this.keywordRoleMap.entries()) {
      if (lowerText.includes(keyword)) {
        matchedRoles.add(role);
      }
    }

    if (matchedRoles.size === 0) {
      return [];
    }

    const results: User[] = [];
    for (const role of matchedRoles) {
      results.push(...this.usersService.findByRole(role));
    }

    const uniqueResults = Array.from(new Map(results.map(u => [u.id, u])).values());

    return uniqueResults;
  }
}
