"use client";

// React
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Context
import { useUserContext } from "@/context/UserContext";
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("nawy-token");
      router.push("/login");
    }
  }, [user]);

  return <>{children}</>;
}
