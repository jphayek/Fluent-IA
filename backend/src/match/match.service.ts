import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class MatchService {
  constructor(private readonly usersService: UsersService) {}

  analyzeText(text: string) {
    const keywordToRole = {
      logo: 'Graphiste',
      site: 'Développeur',
      vidéo: 'Monteur',
      affiche: 'Graphiste',
    };

    const roles = new Set<string>();
    const lowerText = text.toLowerCase();
    for (const keyword in keywordToRole) {
      if (lowerText.includes(keyword)) {
        roles.add(keywordToRole[keyword]);
      }
    }

    const matchedUsers = Array.from(roles)
      .map(role => this.usersService.findByRole(role))
      .flat();

    return matchedUsers;
  }
}