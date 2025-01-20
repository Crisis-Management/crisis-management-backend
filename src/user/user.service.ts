import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from 'src/auth/permissions.enums';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(paginationQuary: PaginationQueryDto): Promise<any> {
    console.log(paginationQuary);
    const { limit, offset } = paginationQuary;
    const allUsers = await this.usersRepository.find({
      skip: offset,
      take: limit,
    });

    const sanitizedUsers = allUsers.map((allUsers) => {
      const { userId, password, ...userdata } = allUsers;
      return userdata;
    });

    const data = sanitizedUsers;
    return data;
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      return null;
    }
    const { userId, password, ...userdata } = user;
    return userdata;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async getUserEmailWithRole(email: string, roles: Role): Promise<any> {
    console.log(email, [roles]);
    if (roles.includes(Role.ADMIN)) {
      const user = await this.usersRepository.findOne({
        where: { email: email, userType: Role.ADMIN },
      });
      if (!user) {
        return null;
      }
      const { userId, password, ...userdata } = user;
      return userdata;
    } else if (roles.includes(Role.CUSTOMER)) {
      const user = await this.usersRepository.findOne({
        where: { email: email, userType: Role.CUSTOMER },
      });
      if (!user) {
        return null;
      }
      const { userId, password, ...userdata } = user;
      return userdata;
    } else if (roles.includes(Role.PROVIDER)) {
      const user = await this.usersRepository.findOne({
        where: { email: email, userType: Role.PROVIDER },
      });
      if (!user) {
        return null;
      }
      const { userId, password, ...userdata } = user;
      return userdata;
    }
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.usersRepository.update(userId, updateUserDto);
    const user = await this.usersRepository.preload({
      userId: userId,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.usersRepository.save(user);
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    const result = await this.usersRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    throw new HttpException('User deleted successfully', HttpStatus.OK);
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!user) {
      return null;
    }
    const { userId, password, ...userdata } = user;
    return userdata;
  }
}
