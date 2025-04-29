import { Types } from "mongoose";
export interface PropertyFormData {
  name: string;
  description: string;
  referenceNumber: string;
  compoundId: string;
  type: string;
  floorNumber: string;
  totalFloors: string;
  width: string;
  length: string;
  height: string;
  area: string;
  beds: string;
  baths: string;
  parkingSpaces: string;
  finishingStatus: string;
  finishingType: string;
  deliveryDate: string;
  price: string;
  amenities: string[];
  amenityInput: string;
  floorPlan: File | null;
  images: File[];
}

export interface PropertyFilter {
  name: string;
  propertyNumber: string;
  propertyType: string;
  beds: string;
  baths: string;
  priceRange: [number, number];
  developer: string;
}

export interface Property {
  _id: Types.ObjectId; // required

  // Optional fields
  name?: string;
  description?: string;
  referenceNumber?: number;

  compoundId?: { _id: Types.ObjectId; name: string; masterPlan: string };
  latitude?: number;
  longitude?: number;

  type?: string;
  floorNumber?: number;
  totalFloors?: number;
  width?: number;
  length?: number;
  height?: number;
  area?: number;
  beds?: number;
  baths?: number;
  parkingSpaces?: number;
  finishingStatus?: string;
  finishingType?: string;
  deliveryDate?: string;
  price?: number;
  amenities?: string[];
  floorPlan?: string;
  images: string[];

  developerId: { _id: Types.ObjectId; logo: string };
  userId?: Types.ObjectId;
  isDeleted?: boolean;
}
