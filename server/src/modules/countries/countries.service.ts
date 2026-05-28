import { Injectable } from '@nestjs/common';
import { CountriesRepository } from './countries.repository';

@Injectable()
export class CountriesService {
  constructor(private readonly countriesRepository: CountriesRepository) {}
  async findAll() {
    return this.countriesRepository.findAll();
  }
}
