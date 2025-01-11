import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignupDto, UserLoginDto } from 'src/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Role } from './permissions.enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async registerUser(data: SignupDto): Promise<any> {
    const userByEmail = await this.userService.getUserByEmail(data.email);

    if (userByEmail) {
      throw new BadRequestException('Email already exists');
    }

    const userByPhone = await this.userService.getUserByPhoneNumber(
      data.phoneNumber,
    );
    if (userByPhone) {
      throw new BadRequestException('Phone number already exists');
    }

    const hashedPassword = await this.hashPassword(data.password);
    const newUser = this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    const { password, ...userData } = newUser;
    return userData;
  }

  async userLogin(data: UserLoginDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await this.validateUser(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { email: user.email, roles: [Role.CUSTOMER] };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    };
  }
}
