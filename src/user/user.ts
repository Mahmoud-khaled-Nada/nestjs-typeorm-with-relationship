import { User } from 'src/utils/database';
import { CreateUserDto } from './dto/create-user.dto';

export interface IUserService {
  findUser(id: number): Promise<User>;
  findOneBy(email: string): Promise<User | undefined>;
  create(createUserDto: CreateUserDto): Promise<User>;
}
