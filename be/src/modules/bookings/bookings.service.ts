import { CreateBookingDto } from './dtos/create-booking.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Property } from '../properties/schemas/properties.schema';
import { PropertiesService } from '../properties/properties.service';
import { BookingInterface } from './bookings.interface';
import { Booking, BookingDocument } from './entities/bookings.entity';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class BookingsService {
  constructor(
    // private readonly bookingModel: Model<BookingDocument>,
    private readonly propertiesService: PropertiesService,
    @InjectModel(Booking.name)
    private BookingModel: Model<BookingDocument>,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    userId: string,
  ): Promise<{ message: string; createBookingDto: CreateBookingDto }> {
    try {
      const property = await this.propertiesService.getOne({
        _id: new Types.ObjectId(createBookingDto.propertyId),
        isDeleted: false,
      });
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      // check the property price
      if (property.price !== createBookingDto.price) {
        throw new BadRequestException('Property price does not match');
      }

      const existingBooking = await this.BookingModel.findOne({
        propertyId: new Types.ObjectId(createBookingDto.propertyId),
        isDeleted: false,
      });
      if (existingBooking) {
        throw new BadRequestException(
          'Booking already exists for this property',
        );
      }

      const newBooking = await new this.BookingModel({
        ...createBookingDto,
        propertyId: new Types.ObjectId(createBookingDto.propertyId),
        userId: new Types.ObjectId(userId),
      }).save();
      console.log('newBooking', newBooking);
      return { message: 'Booking created successfully', createBookingDto };
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new BadRequestException('Failed to create booking');
    }
  }

  async getMany() {
    // Logic to get all bookings
    return { message: 'List of bookings' };
  }
  async getOne(filter: BookingInterface): Promise<BookingDocument> {
    const user = await this.BookingModel.findOne(filter).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
