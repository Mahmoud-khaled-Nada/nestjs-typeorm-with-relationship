import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User ID not found', HttpStatus.NOT_FOUND);
  }
}