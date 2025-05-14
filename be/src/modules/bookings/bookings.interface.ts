import { Types } from 'mongoose';

export interface BookingInterface {
  id?: Types.ObjectId;
  userId?: Types.ObjectId;
  propertyId?: Types.ObjectId;
  bookingDate?: Date;
  price?: number;
  paymentId?: Types.ObjectId;
}
