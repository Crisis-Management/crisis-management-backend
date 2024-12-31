import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateIncidentDto {
  @IsNumber()
  incidentId?: number;
  @IsString()
  type: string;
  @IsString()
  severity: string;
  @IsString()
  location: string;
  @IsString()
  status: string;
  @IsString()
  description: string;
  @IsDate()
  startTime: Date;
  @IsDate()
  endTime?: Date;
  @IsString()
  affectedArea: string;
}
