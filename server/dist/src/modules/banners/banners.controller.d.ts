import { BannersService } from './banners.service';
export declare class BannersController {
    private readonly bannersService;
    constructor(bannersService: BannersService);
    findActive(): Promise<any[]>;
    findAll(): Promise<any[]>;
    create(data: any, files: {
        firstImage?: Express.Multer.File[];
        secondImage?: Express.Multer.File[];
    }): Promise<any>;
    update(id: number, data: any, files: {
        firstImage?: Express.Multer.File[];
        secondImage?: Express.Multer.File[];
    }): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
