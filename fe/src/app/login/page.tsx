"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { login } from "@/actions/auth";
import { useMessage } from "@/context/MessageContext";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setMessage } = useMessage();
  const { setUser } = useUserContext();
  const router = useRouter();

  async function handleLogin(event: React.FormEvent) {
    try {
      event.preventDefault(); // Prevent the default form submission
      const form = event.target as HTMLFormElement;
      const isFormValid = form.checkValidity(); // Check if the form is valid
      if (isFormValid) {
        setLoading(true);
        const response: any = await login(email, password);
        setUser({
          accessToken: response.data.accessToken,
          name: response.data.name,
          username: response.data.username,
        });
        localStorage.setItem("nawy-token", response.data.accessToken);
        setMessage(`Welcome back, ${response.data.name}`, "normal");
        router.push("/");
      } else {
        setMessage("Invalid data!", "error");
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Something went wrong!";
      setMessage(errorMessage, "error");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex p-5">
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center flex-1 p-10">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sign In <span className="star-animation">✦</span>
          </h2>
          <p className="text-gray-500 mb-6">
            Please login to continue to your account.
          </p>

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                className="w-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-5">
        <div className="relative w-full h-5/6 rounded-2xl overflow-hidden shadow-lg animate-float">
          <Image
            src="/login-11.jpg"
            alt="Building"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
