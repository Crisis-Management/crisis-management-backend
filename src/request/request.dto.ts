import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEmergencyRequestDto {
  @IsNumber()
  requestId?: number;
  @IsNumber()
  userId: number;
  @IsString()
  type: string;
  @IsString()
  priority: string;
  @IsString()
  status: string;
  @IsString()
  location: string;
  @IsString()
  description: string;
  @IsDate()
  createdAt?: Date;
  @IsDate()
  updatedAt?: Date;
  @IsString()
  assignedTo?: string;
  @IsString()
  completionStatus: string;
}
