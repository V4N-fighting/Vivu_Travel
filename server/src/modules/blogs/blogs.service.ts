import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';

@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepo: BlogsRepository) {}

  async findAll() {
    return this.blogsRepo.findAll();
  }

  async findById(id: number) {
    return this.blogsRepo.findById(id);
  }

  async create(data: any) {
    return this.blogsRepo.create(data);
  }

  async update(id: number, data: any) {
    return this.blogsRepo.update(id, data);
  }

  async delete(id: number) {
    return this.blogsRepo.delete(id);
  }
}
