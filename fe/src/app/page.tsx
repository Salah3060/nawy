"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaBed, FaBath, FaRulerCombined, FaCar } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getProperties } from "@/actions/properties";
import { useError } from "@/context/ErrorContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { setError } = useError();

  const fetchProperties = useCallback(
    async (pageNumber: number) => {
      try {
        if (pageNumber === 1) setLoading(true);
        else setIsFetchingMore(true);

        const response = await getProperties(pageNumber);
        const newProperties = response.data;

        if (pageNumber === 1) {
          setProperties(newProperties);
        } else {
          setProperties((prev) => [...prev, ...newProperties]);
        }

        setLoading(false);
        setIsFetchingMore(false);
      } catch (error) {
        setLoading(false);
        setIsFetchingMore(false);
        const errorMessage =
          (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Something went wrong!";
        setError(errorMessage);
      }
    },
    [setError]
  );

  useEffect(() => {
    fetchProperties(1);
  }, [fetchProperties]);

  useEffect(() => {
    fetchProperties(1);
  }, [fetchProperties]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is at bottom
      if (scrollTop + windowHeight >= documentHeight - 100 && !isFetchingMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore]);

  useEffect(() => {
    if (page > 1) {
      fetchProperties(page);
    }
  }, [page, fetchProperties]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/here-section-11.jpg')" }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
          <p className="mt-4 text-lg">
            Browse the best properties in your area
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {properties.map((property) => (
              <Card
                key={property.referenceNumber}
                className="bg-white shadow-lg rounded-lg"
              >
                <CardHeader className="relative">
                  <Link
                    href={`/property/${property._id}`}
                    className="block w-full"
                  >
                    <div
                      className="relative h-48 bg-cover bg-center rounded-t-lg transition-transform transform hover:scale-105 hover:shadow-lg"
                      style={{ backgroundImage: `url(${property.images[0]})` }}
                    >
                      <div className="absolute bottom-2 left-2 group">
                        <Image
                          src={property.developerId.logo}
                          alt="Developer Logo"
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-white shadow-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </Link>
                  <CardTitle className="text-xl font-semibold mt-4">
                    {property.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm flex gap-4 items-center">
                    <FaBed className="text-primary" /> {property.beds} Beds
                    <FaBath className="text-primary" /> {property.baths} Baths
                    <FaRulerCombined className="text-primary" /> {property.area}{" "}
                    sq m
                    <FaCar className="text-primary" /> {property.baths} Parking
                  </CardDescription>
                </CardHeader>
                {/* <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {property.description}
                  </p>
                </CardContent> */}
                <CardFooter>
                  <span className="font-semibold text-lg">
                    {property.price} EGP
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
