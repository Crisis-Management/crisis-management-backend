import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsNumber()
  resourceId?: number;
  @IsString()
  type: string;
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
  @IsString()
  location: string;
  @IsString()
  status: string;
  @IsNumber()
  organizationId: number;
  @IsDate()
  lastUpdated?: Date;
}
