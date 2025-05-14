import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBookingDto } from './dtos/create-booking.dto'; // Adjust the path as needed
import { BookingsService } from './bookings.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

@Controller('bookings')
@ApiTags('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post('create')
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({
    status: 201,
    description: 'The booking has been successfully created.',
    type: CreateBookingDto, // Adjust the response type as needed
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  async createBooking(
    @Req() req: RequestWithUser,
    @Body() createBookingDto: CreateBookingDto, // Replace with actual DTO
  ) {
    // Logic to create a booking
    return this.bookingsService.create(createBookingDto, req.user.userId);
  }
}
