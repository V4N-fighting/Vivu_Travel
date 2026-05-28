import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: number) {
    return this.usersRepository.findById(id);
  }

  async update(id: number, userData: any) {
    return this.usersRepository.updateProfile(id, userData);
  }
}
