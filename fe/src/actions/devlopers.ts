// Compound  Actions
import axios from "@/lib/axios";

// Get Compounds
export async function getDevelopers(selections: string = "") {
  const response = await axios.get(
    `/api-v1/developers/all?selections=${selections}`
  );
  return response;
}
