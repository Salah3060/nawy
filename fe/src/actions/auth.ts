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

// Login
export async function validateToken() {
  const token = localStorage.getItem("nawy-token");
  const response = await axios.post(
    "/api-v1/auth/validate-token",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
