// Property  Actions

import {
  PropertyFilter,
  PropertyFormData,
} from "@/interfaces/property.interface";
import axios from "@/lib/axios";

// Generate Query Parameters
function generateQueryParams(
  page: number,
  limit: number,
  filters: PropertyFilter
): string {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));

  if (filters.propertyType) {
    params.append("type", filters.propertyType);
  }
  if (filters.beds) {
    params.append("beds", filters.beds);
  }
  if (filters.baths) {
    params.append("baths", filters.baths);
  }
  if (filters.developer) {
    params.append("developer", filters.developer);
  }
  if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 0) {
    params.append("priceMin", filters.priceRange[0].toString());
    params.append("priceMax", filters.priceRange[1].toString());
  }

  return params.toString();
}

// Get Properties
export async function getProperties(page: number = 1, filters: PropertyFilter) {
  let params = generateQueryParams(page, 5, filters);
  const response = await axios.get(`/api-v1/properties/all?${params}`);
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
