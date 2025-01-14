import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from './incident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentEntity])],
  providers: [IncidentService],
  controllers: [IncidentController],
})
export class IncidentModule {}
