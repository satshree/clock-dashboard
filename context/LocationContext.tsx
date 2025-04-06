import React, { createContext, ReactNode, useEffect, useState } from "react";

import { emptyLocationData, Location } from "@/api/location";
import { getLocation, saveLocation } from "@/utils/localStorage";

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
  const [location, setLocation] = useState<Location>(emptyLocationData);

  useEffect(() => {
    const loadFromLocal = async () => {
      const localValue = await getLocation();

      console.log("there", localValue);
      setLocation(localValue);
    };

    console.log("here");

    loadFromLocal();
  }, []);

  const updateLocation = (l: Location) => {
    setLocation(l);
    saveLocation(l);
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
