import { Types } from 'mongoose';

export type DeveloperFilter = {
  _id?: Types.ObjectId;
  name?: string;
  referenceNumber?: number;
  isDeleted: boolean;
};
