// Auth  Service
import axios from "@/lib/axios";

export async function login(email: string, password: string) {
  const response = await axios.post("/api-v1/auth/login", {
    username: email,
    password,
  });
  return response;
}
