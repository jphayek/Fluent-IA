import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MatchModule } from './match/match.module';
import { SearchModule } from './search/search.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { UsersModule } from './modules/users/users.module';
import { IaModule } from './ia/ia.module';
=======
import { TestEntity } from './test.entity';
>>>>>>> Yves

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
<<<<<<< HEAD
    UsersModule,
    IaModule
=======
    TypeOrmModule.forFeature([TestEntity]),
    AuthModule, 
    UsersModule, 
    MatchModule, 
    SearchModule
>>>>>>> Yves
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
