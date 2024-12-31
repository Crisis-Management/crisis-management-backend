import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  taskId?: number;
  @IsNumber()
  incidentId: number;
  @IsString()
  assignedTo: string;
  @IsString()
  priority: string;
  @IsString()
  status: string;
  @IsString()
  description: string;
  @IsDate()
  dueDate: Date;
  @IsDate()
  completionDate?: Date;
}
