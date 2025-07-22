import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Physician } from './entities/physician.entity';
import { PhysicianService } from './physician.service';
import { PhysicianController } from './physician.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Physician])],
  controllers: [PhysicianController],
  providers: [PhysicianService],
  exports: [PhysicianService],
})
export class PhysicianModule {}
