"use client";

// React
import { useState, useEffect, useCallback, useRef } from "react";

// Lib
import axios from "axios";

// Components
import HeroComponent from "@/components/HeroComponent";
import PropertiesComponent from "@/components/PropertiesComponent";
import FiltersComponent from "@/components/FiltersComponent";
import LoadingComponent from "@/components/LoadingComponent";

// Actions
import { getProperties } from "@/actions/properties";

// Context
import { useMessage } from "@/context/MessageContext";

// Interfaces
import { Property, PropertyFilter } from "@/interfaces/property.interface";

// Home Page
export default function Home() {
  // States & Variables
  const [loading, setLoading] = useState<boolean>(true);
  const { setMessage } = useMessage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const isThrottled = useRef(false);
  const [filters, setFilters] = useState<PropertyFilter>({
    name: "",
    propertyNumber: "",
    propertyType: "",
    beds: "",
    baths: "",
    priceRange: [500000, 100000000],
    developer: "",
  });

  // Fetching Properties
  const fetchProperties = useCallback(
    async (pageNumber: number, filters: PropertyFilter) => {
      try {
        isThrottled.current = true;
        pageNumber === 1 ? setLoading(true) : setIsFetchingMore(true);

        const response = await getProperties(pageNumber, filters);
        const newProperties = response.data;
        if (newProperties.length === 0) setLoadingMore(false);
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
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <main>
      {/* Hero Section */}
      <HeroComponent />

      {/* Filter Section */}
      <FiltersComponent
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
      />

      {/* Properties Section */}
      <PropertiesComponent properties={properties} />
    </main>
  );
}
