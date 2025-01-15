import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    const { userId, ...rest } = createNotificationDto;

    // Find the user to associate the notification with
    const user = await this.usersRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const notification = this.notificationRepository.create({
      ...rest,
      user,
    });

    return await this.notificationRepository.save(notification);
  }

  async findAll(): Promise<NotificationEntity[]> {
    return await this.notificationRepository.find({ relations: ['user'] });
  }

  async markAsRead(notificationId: number): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({
      where: { notificationId },
    });
    if (!notification) {
      throw new NotFoundException(
        `Notification with ID ${notificationId} not found`,
      );
    }

    notification.status = 'read';
    return await this.notificationRepository.save(notification);
  }

  async delete(notificationId: number): Promise<void> {
    const result = await this.notificationRepository.delete(notificationId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Notification with ID ${notificationId} not found`,
      );
    }
  }
}
