import { emptyWeatherData, Weather } from "@/api/weather";
import { emptyLocationData, Location } from "@/api/location";

export function saveToLocalStorage(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    let value = localStorage.getItem(key);

    try {
      return JSON.parse(value || "");
    } catch {
      return value;
    }
  }
}

export const LOCATION_LOCAL_STORAGE_KEY = "CL_WT_WIDGET_LOCATION";
export function saveLocation(location: Location) {
  saveToLocalStorage(LOCATION_LOCAL_STORAGE_KEY, JSON.stringify(location));
}

export function getLocation(): Location {
  const data = loadFromLocalStorage(LOCATION_LOCAL_STORAGE_KEY);
  if (data) return data;

  return emptyLocationData;
}

export const WEATHER_LOCAL_STORAGE_KEY = "CL_WT_WIDGET_WEATHER";
export function saveWeather(weather: Weather) {
  saveToLocalStorage(WEATHER_LOCAL_STORAGE_KEY, JSON.stringify(weather));
}

export function getWeather(): Weather {
  const data = loadFromLocalStorage(WEATHER_LOCAL_STORAGE_KEY);
  if (data) return data;

  return emptyWeatherData;
}
