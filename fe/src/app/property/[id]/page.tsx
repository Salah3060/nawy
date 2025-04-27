"use client"; // This ensures the component runs on the client side

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use this for route params
import { getPropertyById } from "@/actions/properties"; // Function to fetch data by ID
import { FaBed, FaBath, FaRulerCombined, FaCar } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { useError } from "@/context/ErrorContext";

export default function PropertyDetails() {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setError } = useError();

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          setLoading(true);
          const response = await getPropertyById(id as string); // Assuming this function fetches data
          setLoading(false);
          setProperty(response.data);
        } catch (error) {
          setLoading(false);
          const errorMessage =
            (axios.isAxiosError(error) && error.response?.data?.message) ||
            "Something went wrong!";
          setError(errorMessage);
        }
      };
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold">{property.name}</h1>
      <div className="mt-8">
        {/* Image Carousel */}
        <div className="relative">
          <Image
            src={property.images[0]}
            alt="Property Image"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Property Details */}
      <div className="mt-8">
        <div className="flex gap-8">
          <div>
            <p className="text-xl font-semibold">{property.price} EGP</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {property.description}
            </p>
          </div>
          <div>
            <div className="flex gap-4 items-center">
              <FaBed className="text-primary" />{" "}
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex gap-4 items-center mt-2">
              <FaBath className="text-primary" />{" "}
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex gap-4 items-center mt-2">
              <FaRulerCombined className="text-primary" />{" "}
              <span>{property.area} sq m</span>
            </div>
            <div className="flex gap-4 items-center mt-2">
              <FaCar className="text-primary" />{" "}
              <span>{property.parkingSpaces} Parking Spaces</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
