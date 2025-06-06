import { Types } from 'mongoose';

export type CompoundFilter = {
  _id?: Types.ObjectId;
  name?: string;
  referenceNumber?: number;
  isDeleted: boolean;
};
