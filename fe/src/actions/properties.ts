// actions/properties.ts
import axios from "@/lib/axios";

export async function getProperties(page = 1) {
  const response = await axios.get(`/api-v1/properties/all?page=${page}`);
  return response;
}

export async function getPropertyById(id: string) {
  const response = await axios.get(`/api-v1/properties/one/${id}`);
  return response;
}
