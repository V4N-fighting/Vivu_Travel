import { Module } from '@nestjs/common';
import { TourTypesController } from './tour-types.controller';
import { TourTypesService } from './tour-types.service';
import { TourTypesRepository } from './tour-types.repository';

@Module({
  controllers: [TourTypesController],
  providers: [TourTypesService, TourTypesRepository],
  exports: [TourTypesService]
})
export class TourTypesModule {}
