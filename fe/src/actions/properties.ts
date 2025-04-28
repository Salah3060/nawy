// Property  Actions

import { PropertyFormData } from "@/interfaces/property.interface";
import axios from "@/lib/axios";

// Get Properties
export async function getProperties(page: number = 1) {
  const response = await axios.get(
    `/api-v1/properties/all?page=${page}&limit=${5}`
  );
  return response;
}

// Get Property
export async function getPropertyById(id: string) {
  const response = await axios.get(`/api-v1/properties/one/${id}`);
  return response;
}

// Create Property
export async function createProperty(property: PropertyFormData) {
  const token = localStorage.getItem("nawy-token");

  const payload = new FormData();
  payload.append("name", property.name);
  payload.append("description", property.description);
  payload.append("referenceNumber", property.referenceNumber);
  payload.append("compoundId", property.compoundId);
  payload.append("type", property.type);
  payload.append("floorNumber", property.floorNumber);
  payload.append("totalFloors", property.totalFloors);
  payload.append("width", property.width);
  payload.append("length", property.length);
  payload.append("height", property.height);
  payload.append("area", property.area);
  payload.append("beds", property.beds);
  payload.append("baths", property.baths);
  payload.append("parkingSpaces", property.parkingSpaces);
  payload.append("finishingStatus", property.finishingStatus);
  payload.append("finishingType", property.finishingType);
  payload.append("deliveryDate", property.deliveryDate);
  payload.append("price", property.price);
  property.amenities.forEach((amenity, index) => {
    payload.append(`amenities[${index}]`, amenity);
  });
  if (property.floorPlan) payload.append("floorPlan", property.floorPlan);
  property.images.forEach((image) => {
    payload.append("images", image);
  });

  const response = await axios.post("/api-v1/properties/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
