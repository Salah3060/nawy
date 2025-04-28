// Auth  Actions
import axios from "@/lib/axios";

// Login
export async function login(email: string, password: string) {
  const response = await axios.post("/api-v1/auth/login", {
    username: email,
    password,
  });
  return response;
}
