import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'customer',
  })
  userType: 'customer' | 'provider' | 'admin';

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '1234567890',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'New York',
  })
  @IsString()
  location: string;
}

export class UserLoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123',
  })
  @IsString()
  password: string;
}
