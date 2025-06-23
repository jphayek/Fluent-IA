import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MatchModule } from './match/match.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AuthModule, UsersModule, MatchModule, SearchModule],
})
export class AppModule {}
