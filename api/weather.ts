/**
 * API Doc: https://openweathermap.org/current
 */

import openWeatherAPIRequest from ".";

export type Weather = {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  timezone: number; // Shift in seconds from UTC
};

export const emptyWeatherData: Weather = {
  id: 0,
  name: "",
  coord: {
    lat: 0,
    lon: 0,
  },
  weather: [],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
  },
  timezone: 0,
};

export default async function getWeather(
  lat: number,
  lon: number,
  unit: "metric" | "imperial"
): Promise<Weather> {
  const response = await openWeatherAPIRequest.get(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}`
  );

  return response.data;
}
