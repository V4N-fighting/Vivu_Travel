import { Injectable } from '@nestjs/common';
import { BannersRepository } from './banners.repository';

@Injectable()
export class BannersService {
  constructor(private readonly bannersRepository: BannersRepository) {}
  async findAll() {
    return this.bannersRepository.findAll();
  }
}
