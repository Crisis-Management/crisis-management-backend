import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
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

export class UpdateRequestDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  completionStatus?: string;
}
