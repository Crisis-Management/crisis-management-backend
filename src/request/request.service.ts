import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { CreateRequestDto, UpdateRequestDto } from './request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
  ) {}

  async createRequest(
    createRequestDto: CreateRequestDto,
  ): Promise<RequestEntity> {
    const request = this.requestRepository.create(createRequestDto);
    return this.requestRepository.save(request);
  }

  async getRequests(): Promise<RequestEntity[]> {
    return this.requestRepository.find({ relations: ['user'] });
  }

  async getRequestById(requestId: number): Promise<RequestEntity> {
    const request = await this.requestRepository.findOne({
      where: { requestId },
      relations: ['user'],
    });
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    return request;
  }

  async updateRequest(
    requestId: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<RequestEntity> {
    const request = await this.getRequestById(requestId);
    Object.assign(request, updateRequestDto);
    return this.requestRepository.save(request);
  }

  async deleteRequest(requestId: number): Promise<void> {
    const request = await this.getRequestById(requestId);
    await this.requestRepository.remove(request);
  }
}
