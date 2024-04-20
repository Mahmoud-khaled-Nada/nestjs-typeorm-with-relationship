import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseUser } from '../user/dto/base-user.dto';
import { Public } from './public/public-strategy';
import { AuthUser } from '../utils/user.decorator';
import { User } from '../utils/database/entities/user';
import { Services } from 'src/utils/constants';
import { IAuthService } from './auth';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
  ) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  signUp(@Body() signUpDto: Record<string, any>) {
    const payload = {
      username: signUpDto.username,
      email: signUpDto.email,
      password: signUpDto.password,
      createdAt: new Date(),
    };
    return this.authService.signUp(payload);
  }

  @Get('user')
  async findOne(
    @AuthUser(new ValidationPipe({ validateCustomDecorators: true }))
    user: User,
  ) {
    console.log(user);
    return user;
  }
}
