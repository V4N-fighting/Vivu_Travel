import { Controller, Get, Param } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    return this.couponsService.findByCode(code);
  }
}
