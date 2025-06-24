import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MatchModule } from './match/match.module';
import { SearchModule } from './search/search.module';
import { OrganisationModule } from './organisations/organisation.module'; // Changé ici
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestEntity } from './test.entity';
import { User } from './users/user.entity';
import { Organisation } from './organisations/organisation.entity';
import { Prestation } from './prestations/prestation.entity';
import { Tag } from './tags/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'fluent_ia',
      entities: [TestEntity, User, Organisation, Prestation, Tag],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([TestEntity]),
    AuthModule, 
    UsersModule, 
    MatchModule, 
    SearchModule,
    OrganisationModule // Changé ici
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
