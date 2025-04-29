// React
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import { FaBed, FaBath, FaRulerCombined, FaCar } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Interfaces
import { Property } from "@/interfaces/property.interface";
interface PropertiesSectionProps {
  properties: Property[];
}

// Properties Component
const PropertiesComponent = ({ properties }: PropertiesSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                <CardDescription className="text-muted-foreground text-sm flex gap-4 items-center flex-wrap">
                  <FaBed className="text-primary" /> {property.beds} Beds
                  <FaBath className="text-primary" /> {property.baths} Baths
                  <FaRulerCombined className="text-primary" /> {property.area}{" "}
                  m²
                  <FaCar className="text-primary" /> {property.baths} Parking
                </CardDescription>
              </CardHeader>

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
  );
};

export default PropertiesComponent;
