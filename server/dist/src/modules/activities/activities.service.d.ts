import { ActivitiesRepository } from './activities.repository';
export declare class ActivitiesService {
    private readonly activitiesRepository;
    constructor(activitiesRepository: ActivitiesRepository);
    findAll(): Promise<any[]>;
}
