import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentEntity } from './incident.entity';
import { Repository } from 'typeorm';
import { CreateIncidentDto } from './incident.dto';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(IncidentEntity)
    private incidentRepository: Repository<IncidentEntity>,
  ) {}

  async create(createIncidentDto: CreateIncidentDto): Promise<IncidentEntity> {
    const incident = this.incidentRepository.create(createIncidentDto);
    return await this.incidentRepository.save(incident);
  }

  async findAll(): Promise<IncidentEntity[]> {
    return await this.incidentRepository.find();
  }

  async findOne(id: number): Promise<IncidentEntity> {
    const incident = await this.incidentRepository.findOne({
      where: { incidentId: id },
    });
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async update(
    id: number,
    updateData: Partial<CreateIncidentDto>,
  ): Promise<IncidentEntity> {
    const incident = await this.findOne(id);
    Object.assign(incident, updateData);
    return await this.incidentRepository.save(incident);
  }

  async remove(id: number): Promise<void> {
    const incident = await this.findOne(id);
    await this.incidentRepository.remove(incident);
  }
}
