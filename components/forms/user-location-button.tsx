"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserLocationButtonProps {
  onLocationSelect: (latitude: number, longitude: number) => void;
}

export default function UserLocationButton({ onLocationSelect }: UserLocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getUserLocation = () => {
    setIsLoading(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSelect(latitude, longitude);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={getUserLocation}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        "Getting location..."
      ) : (
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
            <circle cx="12" cy="9" r="3" />
          </svg>
          Use Current Location
        </div>
      )}
    </Button>
  );
}
