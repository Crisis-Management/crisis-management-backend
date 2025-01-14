import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  incidentId: number;

  @IsNumber()
  assignedTo: number;

  @IsString()
  priority: string;

  @IsString()
  status: string;

  @IsString()
  description: string;

  @IsDate()
  dueDate: Date;
}
