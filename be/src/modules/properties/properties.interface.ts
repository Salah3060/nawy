import { Types } from 'mongoose';

export type PropertyFilter = {
  _id?: Types.ObjectId;
  name?: string;
  referenceNumber?: number;
  isDeleted: boolean;
};
