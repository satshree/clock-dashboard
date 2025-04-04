import React, { ReactNode } from "react";

import LocationProvider from "./LocationContext";
import WeatherProvider from "./WeatherContext";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <LocationProvider>
      <WeatherProvider>{children}</WeatherProvider>
    </LocationProvider>
  );
}
