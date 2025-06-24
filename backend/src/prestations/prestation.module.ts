import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestation } from './prestation.entity';
import { PrestationService } from './prestation.service';
import { PrestationController } from './prestation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prestation])],
  providers: [PrestationService],
  controllers: [PrestationController],
  exports: [PrestationService],
})
export class PrestationModule {}