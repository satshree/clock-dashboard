import React, { ReactNode } from "react";

import UnitProvider from "./UnitContext";
import WeatherProvider from "./WeatherContext";
import LocationProvider from "./LocationContext";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <LocationProvider>
      <WeatherProvider>
        <UnitProvider>{children}</UnitProvider>
      </WeatherProvider>
    </LocationProvider>
  );
}
