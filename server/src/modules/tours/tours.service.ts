import { Injectable, NotFoundException } from '@nestjs/common';
import { ToursRepository } from './tours.repository';

@Injectable()
export class ToursService {
  constructor(private readonly toursRepository: ToursRepository) {}

  async findAll(filters: any) {
    return this.toursRepository.findAll(filters);
  }

  async findOne(id: number) {
    const tour = await this.toursRepository.findById(id);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
    return tour;
  }

  async create(tourData: any) {
    return this.toursRepository.create(tourData);
  }
}
