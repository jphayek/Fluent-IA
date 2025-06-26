import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IaModule } from './ia/ia.module';
import { AuthModule } from './auth/auth.module';
import { PrestationModule } from './prestations/prestation.module';
import { OrganisationModule } from './organisations/organisation.module';
import { Prestation } from './prestations/prestation.entity';
import { Organisation } from './organisations/organisation.entity';
import { User } from './users/user.entity';
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
      entities: [Prestation, Organisation, User, Tag],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    PrestationModule,
    OrganisationModule,
    IaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
