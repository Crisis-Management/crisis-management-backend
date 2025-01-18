import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorators';
import { LogInResponseDto, SignupDto, UserLoginDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<{ message: string }> {
    return this.authService.registerUser(signupDto);
  }

  @Post('login')
  @Public()
  async login(
    @Body() loginDto: UserLoginDto,
    @Response({ passthrough: true }) res,
  ): Promise<LogInResponseDto> {
    const accessToken = await this.authService.userLogin(loginDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 15,
    });
    return accessToken;
  }

  @Post('logout')
  logout(@Response() res) {
    res.cookie('access_token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    throw new HttpException('Logged out successfully', HttpStatus.OK);
  }
}
