import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  notificationId?: number;
  @IsNumber()
  userId: number;
  @IsString()
  type: string;
  @IsString()
  content: string;
  @IsString()
  status: string;
  @IsDate()
  timestamp?: Date;
  @IsString()
  priority: string;
}