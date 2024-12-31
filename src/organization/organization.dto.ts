import { IsNumber, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsNumber()
  organizationId?: number;
  @IsString()
  name: string;
  @IsString()
  type: 'govt' | 'ngo' | 'healthcare' | 'private';
  @IsString()
  contactInfo: string;
  @IsString()
  address: string;
  @IsString()
  serviceArea: string;
  @IsString()
  operationalStatus: string;
  @IsString()
  verificationStatus: string;
  @IsString()
  licenseInfo: string;
}
