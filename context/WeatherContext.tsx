import React, { createContext, ReactNode, useState } from "react";

import { Weather } from "@/api/weather";
import { getWeather, saveWeather } from "@/utils/localStorage";

interface WeatherContextType {
  weather: Weather;
  updateWeather: (weather: Weather) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

export default function WeatherProvider({ children }: { children: ReactNode }) {
  const localValue = getWeather();
  const [weather, setWeather] = useState<Weather>(localValue);

  const updateWeather = (w: Weather) => {
    setWeather(w);
    saveWeather(w);
  };

  return (
    <WeatherContext.Provider value={{ weather, updateWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
