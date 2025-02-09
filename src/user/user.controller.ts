import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/auth.decorators';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from 'src/auth/permissions.enums';
import { Roles } from 'src/common/decorators/role.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('users')
  @Public()
  async getUsers(@Query() paginationQuary: PaginationQueryDto) {
    return await this.userService.getAllUsers(paginationQuary);
  }

  @Get('userByEmail')
  @Public()
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }

  @Post()
  @Roles(Role.ADMIN)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userByEmail = await this.userService.getUserByEmail(
      createUserDto.email,
    );
    if (userByEmail) {
      throw new BadRequestException('Email already exists');
    }
    const userByPhone = await this.userService.getUserByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (userByPhone) {
      throw new BadRequestException('Phone number already exists');
    }
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
  @Get('userByEmailRole')
  @Roles(Role.CUSTOMER)
  async getUserEmailWithRole(@Request() req) {
    return await this.userService.getUserEmailWithRole(
      req.user.email,
      req.user.roles,
    );
  }
}
