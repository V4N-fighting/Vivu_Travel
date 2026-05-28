import { Injectable } from '@nestjs/common';
import { TourTypesRepository } from './tour-types.repository';

@Injectable()
export class TourTypesService {
  constructor(private readonly tourTypesRepository: TourTypesRepository) {}
  async findAll() {
    return this.tourTypesRepository.findAll();
  }
}
