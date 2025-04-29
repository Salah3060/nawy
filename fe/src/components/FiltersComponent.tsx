"use client";

// React
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// Lib
import axios from "axios";

// Components
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
import { getDevelopers } from "@/actions/devlopers";

// Context
import { useMessage } from "@/context/MessageContext";

// Interfaces
import { PropertyFilter } from "@/interfaces/property.interface";
import { Developer } from "@/interfaces/developer.interface";
interface FiltersSectionProps {
  filters: PropertyFilter;
  setFilters: Dispatch<SetStateAction<PropertyFilter>>;
  handleSearch: (e: FormEvent) => Promise<void>;
}

// Filters Component
const FiltersComponent = ({
  filters,
  setFilters,
  handleSearch,
}: FiltersSectionProps) => {
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
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const { setMessage } = useMessage();

  // Fetching Developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await getDevelopers("name");
        setDevelopers(response.data);
      } catch (error) {
        const errorMessage =
          (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Something went wrong!";
        setMessage(errorMessage, "error");
      }
    };

    fetchDevelopers();
  }, []);

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

  return (
    <section className="relative mt-[-4rem] py-12 bg-white shadow-2xl rounded-3xl max-w-6xl mx-auto z-20">
      <div className="container mx-auto px-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>
              <Input
                type="text"
                value={filters.name}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-3 rounded-2xl shadow-md"
                placeholder="Enter Name"
              />
            </div>
            {/* Property Number */}
            <div className="flex flex-col">
              <label
                htmlFor="propertyNumber"
                className="text-sm font-semibold text-gray-700 mb-2"
              >
                Property Number
              </label>
              <Input
                type="number"
                value={filters.propertyNumber}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    propertyNumber: Number(e.target.value),
                  }))
                }
                className="w-full p-3 rounded-2xl shadow-md"
                placeholder="Enter Property Number"
              />
            </div>

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
  );
};

export default FiltersComponent;
