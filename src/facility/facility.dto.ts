import { IsNumber, IsString } from 'class-validator';

export class CreateFacilityDto {
  @IsNumber()
  facilityId?: number;
  @IsString()
  type: 'hospital' | 'shelter' | 'supply-center';
  @IsString()
  name: string;
  @IsNumber()
  capacity: number;
  @IsNumber()
  currentOccupancy: number;
  @IsString()
  location: string;
  @IsString()
  status: string;
  @IsString()
  contactInfo: string;
}
