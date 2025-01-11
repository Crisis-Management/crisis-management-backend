import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignupDto, UserLoginDto } from 'src/user/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async registerUser(data: SignupDto): Promise<any> {
    const hashedPassword = await this.hashPassword(data.password);

    const userExists = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (!userExists) {
      // Exclude `registrationDate` to let the database default handle it
      const newUser = this.usersRepository.create({
        ...data,
        // phoneNumber: data.phone,
        password: hashedPassword,
      });

      await this.usersRepository.save(newUser);

      const { password, ...userData } = newUser;
      return userData;
    }

    throw new BadRequestException('User already exists');
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

    const payload = { email: user.email };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    };
  }
}
