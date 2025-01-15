import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.create(createNotificationDto);
  }

  @Get()
  async findAll() {
    return await this.notificationService.findAll();
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: number) {
    return await this.notificationService.markAsRead(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.notificationService.delete(id);
  }
}
