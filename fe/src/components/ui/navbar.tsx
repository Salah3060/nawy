"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("nawy-token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* Left Side: Logo */}
      <div className="text-2xl font-bold">
        <Link href="/">
          <img src="/nawy.svg" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      {/* Right Side: Navigation Links */}
      <div className="flex gap-4">
        <Button variant="link" asChild>
          <Link href="/">Home</Link>
        </Button>

        {isLoggedIn ? (
          <>
            <Button variant="link" asChild>
              <Link href="/property/create">Create Property</Link>
            </Button>
            <Button variant="link" onClick={handleLogout}>
              <Link href="/login">Logout</Link>
            </Button>
          </>
        ) : (
          <Button variant="link" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
