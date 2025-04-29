import { Types } from "mongoose";

export interface Compound {
  _id: string; // required

  // Optional fields
  name: string;
  description?: string;
  referenceNumber?: number;
  isDeleted?: boolean;
}
