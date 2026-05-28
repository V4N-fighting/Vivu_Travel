import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from './activities.repository';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}
  async findAll() {
    return this.activitiesRepository.findAll();
  }
}
