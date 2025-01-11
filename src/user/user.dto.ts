import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/permissions.enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@main.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;

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
    example: '1234567890',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'New York',
  })
  @IsString()
  location: string;

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

  // @ApiProperty({
  //   example: 'customer',
  // })
  // userType: 'customer' | 'provider' | 'admin';

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

export class UpdateUserDto {
  @ApiProperty({ example: 'example@mail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'password' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'customer' })
  @IsOptional()
  @IsString()
  userType?: Role;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'New York' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'active' })
  @IsOptional()
  @IsString()
  status?: 'active' | 'inactive';

  @ApiProperty({ example: 'profilePicture' })
  @IsOptional()
  @IsString()
  profilePicture?: string;
}
