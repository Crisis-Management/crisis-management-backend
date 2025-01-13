import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto, UpdateResourceDto } from './resource.dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  async create(@Body() createResourceDto: CreateResourceDto) {
    return await this.resourceService.create(createResourceDto);
  }

  @Get()
  async findAll() {
    return await this.resourceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.resourceService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return await this.resourceService.update(+id, updateResourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.resourceService.remove(+id);
  }
}
