import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto, UpdateResourceDto } from './resource.dto';
import { ResourceEntity } from './resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private resourceRepository: Repository<ResourceEntity>,
  ) {}
  async create(createResourceDto: CreateResourceDto): Promise<ResourceEntity> {
    const resource = this.resourceRepository.create(createResourceDto);
    return await this.resourceRepository.save(resource);
  }

  async findAll(): Promise<ResourceEntity[]> {
    return await this.resourceRepository.find();
  }

  async findOne(id: number): Promise<ResourceEntity> {
    const resource = await this.resourceRepository.findOne({
      where: { resourceId: id },
    });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
    return resource;
  }

  async update(
    id: number,
    updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceEntity> {
    const resource = await this.findOne(id);
    Object.assign(resource, updateResourceDto);
    return await this.resourceRepository.save(resource);
  }

  async remove(id: number): Promise<void> {
    const resource = await this.findOne(id);
    await this.resourceRepository.remove(resource);
  }
}
