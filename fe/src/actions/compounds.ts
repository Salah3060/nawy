// Compound  Actions
import axios from "@/lib/axios";

// Get Compounds
export async function getCompounds(selections: string = "") {
  const response = await axios.get(
    `/api-v1/compounds/all?selections=${selections}`
  );
  return response;
}
