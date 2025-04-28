import { Types } from "mongoose";

export interface Developer {
  _id: Types.ObjectId; // required

  // Optional fields
  name: string;
  description?: string;
  referenceNumber?: number;
  logo?: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  userId?: Types.ObjectId;
  isDeleted?: boolean;
}
