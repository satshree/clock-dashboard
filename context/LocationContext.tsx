import React, { createContext, ReactNode, useState } from "react";

import { Location } from "@/api/location";
import { getLocation } from "@/utils/localStorage";

interface LocationContextType {
  location: Location;
  updateLocation: (location: Location) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export default function LocationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const localValue = getLocation();
  const [location, setLocation] = useState<Location>(localValue);

  const updateLocation = (l: Location) => setLocation(l);

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
