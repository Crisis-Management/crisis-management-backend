import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, UpdateRequestDto } from './request.dto';
import { UserService } from 'src/user/user.service';

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
  async getRequests() {
    return this.requestService.getRequests();
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
    return { message: 'Request deleted successfully' };
  }
}
