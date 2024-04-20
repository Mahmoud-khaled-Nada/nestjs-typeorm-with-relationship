import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/utils/database';

export interface IAuthService {
  signIn(email: string, pass: string): Promise<string>;
  signUp(payload: CreateUserDto): Promise<User>;
}
