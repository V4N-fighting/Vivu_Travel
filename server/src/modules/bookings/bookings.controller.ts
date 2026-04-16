import { Controller, Post, Body, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() bookingData: any, @Request() req) {
    // Lấy userId thực sự từ Token đã giải mã
    const userId = req.user.userId;
    return this.bookingsService.create({ ...bookingData, userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number, @Request() req) {
    // Chỉ cho phép xem lịch sử của chính mình (hoặc admin)
    // if (req.user.userId !== userId && req.user.role !== 'admin') { ... }
    return this.bookingsService.findByUser(userId);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.findById(id);
  }
}
