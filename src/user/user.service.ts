import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../utils/database/entities/user';
import { IUserService } from './user';
@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({
      id: id,
    });
  }

  async findOneBy(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async create(createUserDto: CreateUserDto) {
    const params = { ...createUserDto, createdAt: new Date() };
    const newUser = this.userRepository.create(params);
    return this.userRepository.save(newUser);
  }
}
