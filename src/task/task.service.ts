import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { taskId: id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(
    id: number,
    updateData: Partial<CreateTaskDto>,
  ): Promise<TaskEntity> {
    const task = await this.findOne(id);
    Object.assign(task, updateData);
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
