"use client";

// React
import { useEffect, useState } from "react";

// Lib
import axios from "axios";

// Components
import { Toaster } from "sonner";
import LoadingComponent from "./LoadingComponent";

// Actions
import { validateToken } from "@/actions/auth";

// Context
import { useUserContext } from "@/context/UserContext";
import { useMessage } from "@/context/MessageContext";

export default function ClientValidator({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useUserContext();
  const { setMessage } = useMessage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("nawy-token");
        if (token) {
          const response: any = await validateToken();
          setUser(response.data);
        }
      } catch (error) {
        // const errorMessage =
        //   (axios.isAxiosError(error) && error.response?.data?.message) ||
        //   "Something went wrong!";
        // setMessage(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  if (loading) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <>
      <Toaster position="bottom-right" />
      {children}
    </>
  );
}
