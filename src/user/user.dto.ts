import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  userId?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  userType: 'customer' | 'provider' | 'admin';

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  location: string;

  @IsDate()
  @Type(() => Date)
  registrationDate?: Date;

  @IsString()
  status: 'active' | 'inactive';

  @IsString()
  profilePicture?: string;
}

export class SignupDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  location: string;
}

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
