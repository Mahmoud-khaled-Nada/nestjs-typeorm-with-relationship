import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/utils/database/entities/user';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOneBy(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    // const existingUser = await this.userRepository.findOne({
    //   username: createUserDto.username,
    // });
    // if (existingUser)
    //   throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const params = { ...createUserDto, createdAt: new Date() };
    const newUser = this.userRepository.create(params);
    return this.userRepository.save(newUser);
  }
}

// return this.userRepository.save({
//   ...createUserDto,
//   createdAt: new Date(),
// });
