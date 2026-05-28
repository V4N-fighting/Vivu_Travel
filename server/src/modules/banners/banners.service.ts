import { Injectable } from '@nestjs/common';
import { BannersRepository } from './banners.repository';

@Injectable()
export class BannersService {
  constructor(private readonly bannersRepo: BannersRepository) {}
  async findAll() {
    return this.bannersRepo.findAll();
  }

  async findActive() {
    return this.bannersRepo.findActive();
  }

  async findByLocation(location: string) {
    return this.bannersRepo.findByLocation(location);
  }

  async create(data: any) {
    return this.bannersRepo.create(data);
  }

  async update(id: number, data: any) {
    return this.bannersRepo.update(id, data);
  }

  async delete(id: number) {
    return this.bannersRepo.delete(id);
  }
}
