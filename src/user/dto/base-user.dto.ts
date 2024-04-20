import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
export class BaseUser {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
