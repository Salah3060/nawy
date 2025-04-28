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
