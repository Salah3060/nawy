"use client";

// React
import { useCallback, useEffect, useRef, useState } from "react";
import { FaBed, FaBath, FaRulerCombined, FaCar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// Lib
import axios from "axios";

// Components
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Actions
import { getProperties } from "@/actions/properties";
import { getDevelopers } from "@/actions/devlopers";

// Interfaces
import { Property, PropertyFilter } from "@/interfaces/property.interface";
import { Developer } from "@/interfaces/developer.interface";

// Context
import { useMessage } from "@/context/MessageContext";

export default function Home() {
  // States & Variables
  const [loading, setLoading] = useState<boolean>(true);
  const { setMessage } = useMessage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const isThrottled = useRef(false);
  const [filters, setFilters] = useState<PropertyFilter>({
    propertyType: "",
    beds: "",
    baths: "",
    priceRange: [500000, 100000000],
    developer: "",
  });

  // In real projects, these values should be retrieved from the backend
  const propertyTypes = [
    { value: "Apartment", label: "Apartment" },
    { value: "Duplex", label: "Duplex" },
    { value: "Villa", label: "Villa" },
  ];
  const bedOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ];
  const bathOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ];

  // Fetching Developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        const response = await getDevelopers("name");
        setDevelopers(response.data);
      } catch (error) {
        const errorMessage =
          (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Something went wrong!";
        setMessage(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  // Fetching Properties
  const fetchProperties = useCallback(
    async (pageNumber: number, filters: PropertyFilter) => {
      try {
        isThrottled.current = true;
        pageNumber === 1 ? setLoading(true) : setIsFetchingMore(true);

        const response = await getProperties(pageNumber, filters);
        const newProperties = response.data;
        if (newProperties.length == 0) setLoadingMore(false);
        setProperties((prev) =>
          pageNumber === 1 ? newProperties : [...prev, ...newProperties]
        );
        isThrottled.current = false;
      } catch (error) {
        const errorMessage =
          (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Something went wrong!";
        setMessage(errorMessage, "error");
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    []
  );

  // Initial fetch
  useEffect(() => {
    fetchProperties(1, filters);
  }, [fetchProperties]);

  // Infinite Scroll with throttle
  useEffect(() => {
    const handleScroll = () => {
      if (isThrottled.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100 && !isFetchingMore) {
        isThrottled.current = true; // block
        setPage((prev) => prev + 1);

        setTimeout(() => {
          isThrottled.current = false; // allow again after 500ms
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore]);

  // Fetch next page when `page` increases
  useEffect(() => {
    if (page > 1 && loadingMore) {
      fetchProperties(page, filters);
    }
  }, [page, fetchProperties]);

  // Price Change
  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(e.target.value, 10);
    setFilters((prev) => {
      const newPriceRange: [number, number] = [...prev.priceRange] as [
        number,
        number
      ];
      newPriceRange[index] = value;
      return {
        ...prev,
        priceRange: newPriceRange,
      };
    });
  };

  // Search Filters
  const handleSearch = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setPage(1);
      setLoadingMore(true);
      await fetchProperties(1, filters);
    } catch (error) {
      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Something went wrong!";
      setMessage(errorMessage, "error");
    }
  };

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

      {/* Filter Section */}
      <section className="relative mt-[-4rem] py-12 bg-white shadow-2xl rounded-3xl max-w-6xl mx-auto z-20">
        <div className="container mx-auto px-6">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Property Type */}
              <div className="flex flex-col">
                <label
                  htmlFor="propertyType"
                  className="text-sm font-semibold text-gray-700 mb-2"
                >
                  Property Type
                </label>
                <Select
                  value={filters.propertyType}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, propertyType: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Beds */}
              <div className="flex flex-col">
                <label
                  htmlFor="beds"
                  className="text-sm font-semibold text-gray-700 mb-2"
                >
                  Beds
                </label>
                <Select
                  value={filters.beds}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, beds: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Number of Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    {bedOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Baths */}
              <div className="flex flex-col">
                <label
                  htmlFor="baths"
                  className="text-sm font-semibold text-gray-700 mb-2"
                >
                  Baths
                </label>
                <Select
                  value={filters.baths}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, baths: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Number of Baths" />
                  </SelectTrigger>
                  <SelectContent>
                    {bathOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="flex flex-col">
                <label
                  htmlFor="priceRange"
                  className="text-sm font-semibold text-gray-700 mb-2"
                >
                  Price Range
                </label>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="w-full p-3 rounded-2xl shadow-md"
                    placeholder="Min Price"
                  />
                  <Input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="w-full p-3 rounded-2xl shadow-md"
                    placeholder="Max Price"
                  />
                </div>
              </div>

              {/* Developer */}
              <div className="flex flex-col">
                <label
                  htmlFor="developer"
                  className="text-sm font-semibold text-gray-700 mb-2"
                >
                  Developer
                </label>
                <Select
                  value={filters.developer}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, developer: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Developer" />
                  </SelectTrigger>
                  <SelectContent>
                    {developers.map((option) => (
                      <SelectItem key={option.name} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <Button
                className="bg-black text-white px-8 py-3 rounded-2xl shadow-lg hover:bg-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
                type="submit"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Properties Section */}
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
    </main>
  );
}
