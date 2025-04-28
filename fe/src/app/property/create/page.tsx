"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useMessage } from "@/context/MessageContext";
import axios from "axios";
import { PropertyFormData } from "@/interfaces/property.interface";
import { createProperty } from "@/actions/properties";
import { getCompounds } from "@/actions/compounds";

export default function CreatePropertyPage() {
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
  const router = useRouter();

  // In a real project, these values should be retrieved from the backend.
  const finishingStatuses = ["Not Finished", "In Progress", "Finished"];
  const finishingTypes = ["Core", "Semi Finished", "Fully Finished"];
  const propertyTypes = ["Apartment", "Villa", "Duplex"];

  const [compounds, setCompounds] = useState<any[]>([]);
  const [formData, setFormData] = useState<PropertyFormData>({
    name: "",
    description: "",
    referenceNumber: "",
    compoundId: "",
    type: "",
    floorNumber: "",
    totalFloors: "",
    width: "",
    length: "",
    height: "",
    area: "",
    beds: "",
    baths: "",
    parkingSpaces: "",
    finishingStatus: "",
    finishingType: "",
    deliveryDate: "",
    price: "",
    amenities: [] as string[],
    amenityInput: "",
    floorPlan: null as File | null,
    images: [] as File[],
  });
  const [loading, setLoading] = useState(false);
  const { setMessage } = useMessage();

  // Fetch compounds data on page load
  useEffect(() => {
    const fetchCompounds = async () => {
      try {
        const response: any = await getCompounds("name");
        setCompounds(response.data);
      } catch (error) {
        setLoading(false);
        const errorMessage =
          (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Something went wrong!";
        setMessage(errorMessage, "error");
      }
    };

    fetchCompounds();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAmenity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.amenityInput.trim() !== "") {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, prev.amenityInput.trim()],
        amenityInput: "",
      }));
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setMessage("Only jpg, jpeg, and png files are allowed.", "error");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setMessage("File size should not exceed 3MB.", "error");
      return false;
    }
    return true;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "floorPlan" | "images"
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (type === "floorPlan") {
      const file = files[0];
      if (!isValidFile(file)) return;
      setFormData((prev) => ({ ...prev, floorPlan: file }));
    }

    if (type === "images") {
      const newFiles = Array.from(files);
      if (newFiles.some((file) => !isValidFile(file))) return;
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
    }
  };

  const shouldShowLabel = (field: string) => {
    return (
      formData[field as keyof PropertyFormData] != null &&
      formData[field as keyof PropertyFormData]?.toString().trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const form = e.target as HTMLFormElement;
      const isFormValid = form.checkValidity(); // Check if the form is valid
      if (isFormValid) {
        const response: any = await createProperty(formData);
        setMessage("Property Created", "success");
        router.push("/");
      } else {
        setMessage("Invalid data!", "error");
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Something went wrong!";
      setMessage(errorMessage, "error");
    } finally {
      setLoading(false);
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
    <div className="max-w-4xl mx-auto py-12 px-4 pt-32">
      <h1 className="text-3xl font-bold mb-8">Create Property</h1>
      <Card className="shadow-xl border border-gray-200">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              {shouldShowLabel("name") && <Label htmlFor="name">Name</Label>}
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              {shouldShowLabel("description") && (
                <Label htmlFor="description">Description</Label>
              )}
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>

            {/* Reference Number */}
            <div className="space-y-2">
              {shouldShowLabel("referenceNumber") && (
                <Label htmlFor="referenceNumber">Reference Number</Label>
              )}
              <Input
                id="referenceNumber"
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleChange}
                placeholder="Reference Number"
                type="number"
                required
              />
            </div>

            {/* Finishing Status + Finishing Type */}
            <div className="flex gap-2">
              <div className="space-y-2 w-full">
                {shouldShowLabel("compoundId") && (
                  <Label htmlFor="compoundId">Compound</Label>
                )}
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, compoundId: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Compound" />
                  </SelectTrigger>
                  <SelectContent>
                    {compounds.map((compound) => (
                      <SelectItem key={compound._id} value={compound._id}>
                        {compound.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                {shouldShowLabel("type") && (
                  <Label htmlFor="type">Property Type</Label>
                )}
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Floor Number + Total Floors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {shouldShowLabel("floorNumber") && (
                  <Label htmlFor="floorNumber">Floor Number</Label>
                )}
                <Input
                  id="floorNumber"
                  name="floorNumber"
                  value={formData.floorNumber}
                  onChange={handleChange}
                  placeholder="Floor Number"
                  type="number"
                  required
                />
              </div>
              <div className="space-y-2">
                {shouldShowLabel("totalFloors") && (
                  <Label htmlFor="totalFloors">Total Floors</Label>
                )}
                <Input
                  id="totalFloors"
                  name="totalFloors"
                  value={formData.totalFloors}
                  onChange={handleChange}
                  placeholder="Total Floors"
                  type="number"
                  required
                />
              </div>
            </div>

            {/* Width, Length, Height */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                {shouldShowLabel("width") && (
                  <Label htmlFor="width">Width</Label>
                )}
                <Input
                  id="width"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Width"
                  type="number"
                  required
                />
              </div>
              <div className="space-y-2">
                {shouldShowLabel("length") && (
                  <Label htmlFor="length">Length</Label>
                )}
                <Input
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  placeholder="Length"
                  type="number"
                  required
                />
              </div>
              <div className="space-y-2">
                {shouldShowLabel("height") && (
                  <Label htmlFor="height">Height</Label>
                )}
                <Input
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  type="number"
                  required
                />
              </div>
            </div>

            {/* Area */}
            <div className="space-y-2">
              {shouldShowLabel("area") && <Label htmlFor="area">Area</Label>}
              <Input
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area"
                type="number"
                required
              />
            </div>

            {/* Beds, Baths, Parking Spaces */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                {shouldShowLabel("beds") && <Label htmlFor="beds">Beds</Label>}
                <Input
                  id="beds"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="Beds"
                  type="number"
                  required
                />
              </div>
              <div className="space-y-2">
                {shouldShowLabel("baths") && (
                  <Label htmlFor="baths">Baths</Label>
                )}
                <Input
                  id="baths"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  placeholder="Baths"
                  type="number"
                  required
                />
              </div>
              <div className="space-y-2">
                {shouldShowLabel("parkingSpaces") && (
                  <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                )}
                <Input
                  id="parkingSpaces"
                  name="parkingSpaces"
                  value={formData.parkingSpaces}
                  onChange={handleChange}
                  placeholder="Parking Spaces"
                  type="number"
                  required
                />
              </div>
            </div>

            {/* Finishing Status + Finishing Type */}
            <div className="flex gap-2">
              <div className="space-y-2 w-full">
                {shouldShowLabel("finishingStatus") && (
                  <Label htmlFor="finishingStatus">Finishing Status</Label>
                )}
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, finishingStatus: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Finishing Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {finishingStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                {shouldShowLabel("finishingType") && (
                  <Label htmlFor="finishingType">Finishing Type</Label>
                )}
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, finishingType: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Finishing Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {finishingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Delivery Date */}
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                type="date"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              {shouldShowLabel("price") && <Label htmlFor="price">Price</Label>}
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                required
              />
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              {shouldShowLabel("amenityInput") && (
                <Label htmlFor="amenityInput">Amenities</Label>
              )}
              <Input
                id="amenityInput"
                name="amenityInput"
                value={formData.amenityInput}
                onChange={handleChange}
                onKeyDown={handleAddAmenity}
                placeholder="Add an amenity and press Enter"
              />
              <div className="mt-2">
                {formData.amenities.map((amenity, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="mr-2 mb-2 inline-flex items-center"
                  >
                    {amenity}
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => handleRemoveAmenity(index)}
                    >
                      ×
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Floor Plan */}
            <div className="space-y-2">
              <Label htmlFor="floorPlan">Floor Plan</Label>
              <Input
                id="floorPlan"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "floorPlan")}
              />
            </div>

            {/* Property Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Property Images</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, "images")}
              />
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              type="submit"
            >
              Create Property
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
