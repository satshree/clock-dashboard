import React, { createContext, ReactNode, useEffect, useState } from "react";

import { emptyWeatherData, Weather } from "@/api/weather";
import { getWeather, saveWeather } from "@/utils/localStorage";

interface WeatherContextType {
  weather: Weather;
  updateWeather: (weather: Weather) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

export default function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<Weather>(emptyWeatherData);

  useEffect(() => {
    const loadFromLocal = async () => {
      const localValue = await getWeather();
      setWeather(localValue);
    };

    loadFromLocal();
  }, []);

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
