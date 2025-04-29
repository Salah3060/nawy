"use client";

// React
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

// Lib
import axios from "axios";
import { Types } from "mongoose";

// Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingComponent from "@/components/LoadingComponent";

// Actions
import { getPropertyById } from "@/actions/properties";

// Context
import { useMessage } from "@/context/MessageContext";

// Interfaces
import { Property } from "@/interfaces/property.interface";

// Propery Details Page
export default function PropertyDetails() {
  const { id } = useParams();
  const { setMessage } = useMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [property, setProperty] = useState<Property>({
    _id: new Types.ObjectId(),
    images: [],
    developerId: { _id: new Types.ObjectId(), logo: "" },
  });

  // Get Property Details
  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          setLoading(true);
          const response = await getPropertyById(id as string);
          setLoading(false);
          setProperty(response.data);
        } catch (error) {
          setLoading(false);
          const errorMessage =
            (axios.isAxiosError(error) && error.response?.data?.message) ||
            "Something went wrong!";
          setMessage(errorMessage, "error");
        }
      };
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return <LoadingComponent></LoadingComponent>;
  }

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-6">Property not found.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Property Images */}
      <div className="mt-8">
        <div className="relative h-[75vh]">
          <Carousel>
            <CarouselContent>
              {property.images.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative h-[75vh]">
                    <Image
                      src={image}
                      alt={`Property Image ${index + 1}`}
                      width={900}
                      height={500}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-primary" />
            <CarouselNext className="text-white bg-primary" />
          </Carousel>
        </div>
      </div>

      {/* Developer Info and Property Name & Price */}
      <div className="mt-8 flex items-center gap-8">
        {/* Developer Logo */}
        <div className="flex-shrink-0">
          <Image
            src={property.developerId.logo}
            alt="Developer Logo"
            width={80}
            height={80}
            className="rounded-full border-2 border-white shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
          />
        </div>

        {/* Property Name & Price */}
        <div>
          <h1 className="text-xl font-semibold">{property.name}</h1>
          <p className="font-semibold text-primary mt-2">
            {property.price} EGP
          </p>
        </div>
      </div>

      {/* Property Details */}
      <div className="mt-12 w-1/2 mx-auto">
        <Table className="shadow-lg border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <tr className="bg-gray-100 text-left">
              <TableHead className="px-6 py-3 font-medium">
                {property.type}
              </TableHead>
              <TableHead className="px-6 py-3 font-medium">
                {property.area} m²
              </TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Reference No.
              </TableCell>
              <TableCell className="px-6 py-3">
                {property.referenceNumber}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Bedrooms
              </TableCell>
              <TableCell className="px-6 py-3">{property.beds}</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Floor Number
              </TableCell>
              <TableCell className="px-6 py-3">
                {property.floorNumber}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Bathrooms
              </TableCell>
              <TableCell className="px-6 py-3">{property.baths}</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Parking Spaces
              </TableCell>
              <TableCell className="px-6 py-3">
                {property.parkingSpaces}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Delivery In
              </TableCell>
              <TableCell className="px-6 py-3">
                {property.deliveryDate && property.deliveryDate.slice(0, 4)}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Compound
              </TableCell>
              <TableCell className="px-6 py-3">
                {property.compoundId && property.compoundId.name}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Finishing Type
              </TableCell>
              <TableCell className="px-6 py-3">
                {property.finishingType}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-6 py-3 font-semibold">
                Finishing Status
              </TableCell>
              <TableCell className="px-6 py-3">
                {property.finishingStatus}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Row for Cards: Floor Plan and Master Plan */}
      <div className="mt-16 flex flex-wrap gap-6">
        {/* Floor Plan Card */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Floor Plan</h3>
                <p className="text-sm text-gray-500">
                  View the detailed floor plan of the property.
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogTitle className="sr-only">Floor Plan</DialogTitle>
            <img
              src={property.floorPlan}
              alt="Floor Plan Full"
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>

        {/* Master Plan Card */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <img
                src={property.compoundId && property.compoundId.masterPlan}
                alt="Master Plan"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Master Plan</h3>
                <p className="text-sm text-gray-500">
                  Check out the overall master plan of the compound.
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogTitle className="sr-only">Master Plan</DialogTitle>
            <img
              src={property.compoundId && property.compoundId.masterPlan}
              alt="Master Plan Full"
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
