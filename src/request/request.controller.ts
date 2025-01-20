import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, UpdateRequestDto } from './request.dto';
import { UserService } from 'src/user/user.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private userService: UserService,
  ) {}

  @Post()
  async createRequest(
    @Body() createRequestDto: CreateRequestDto,
    @Body('userId') userId: string,
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newRequest = {
      ...createRequestDto,
      user,
    };
    return this.requestService.createRequest(newRequest);
  }

  @Get()
  async getAllRequests(@Query() paginationQuary: PaginationQueryDto) {
    return this.requestService.getRequests(paginationQuary);
  }

  @Get(':id')
  async getRequestById(@Param('id') id: number) {
    return this.requestService.getRequestById(id);
  }

  @Put(':id')
  async updateRequest(
    @Param('id') id: number,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return this.requestService.updateRequest(id, updateRequestDto);
  }

  @Delete(':id')
  async deleteRequest(@Param('id') id: number) {
    await this.requestService.deleteRequest(id);
    throw new HttpException('Request deleted successfully', HttpStatus.OK);
  }
}
