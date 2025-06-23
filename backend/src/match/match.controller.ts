import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from '../match/match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  match(@Body('text') text: string) {
    return this.matchService.analyzeText(text);
  }
}