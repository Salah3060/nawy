import { Types } from 'mongoose';

export type PropertyFilter = {
  _id?: Types.ObjectId;
  name?: string;
  referenceNumber?: number;
  type?: string;
  beds?: number | { $gte: number };
  baths?: number | { $gte: number };
  priceMin?: number;
  priceMax?: number;
  price?: { $gte?: number; $lte?: number };
  developerId?: Types.ObjectId;
  isDeleted: boolean;
};
