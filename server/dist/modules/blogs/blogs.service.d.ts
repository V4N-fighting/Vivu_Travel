import { BlogsRepository } from './blogs.repository';
export declare class BlogsService {
    private readonly blogsRepo;
    constructor(blogsRepo: BlogsRepository);
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
