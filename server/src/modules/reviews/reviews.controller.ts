import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('tour/:tourId')
  async findByTour(@Param('tourId') tourId: string) {
    return this.reviewsService.findByTour(Number(tourId));
  }

  @Get('latest')
  async findLatest(@Query('limit') limit: string) {
    return this.reviewsService.findLatest(Number(limit) || 5);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req: any, @Body() reviewData: any) {
    return this.reviewsService.create({
      ...reviewData,
      userId: req.user.id,
    });
  }
}
