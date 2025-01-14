import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateIncidentDto {
  @IsString()
  type: string;

  @IsString()
  severity: string;

  @IsString()
  location: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  startTime: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;

  @IsOptional()
  @IsString()
  affectedArea?: string;
}
