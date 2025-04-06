import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { emptyWeatherData, Weather } from "@/api/weather";
import { emptyLocationData, Location } from "@/api/location";

export function saveToLocalStorage(key: string, value: any) {
  if (Platform.OS === "web") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export async function loadFromLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    let value;
    if (Platform.OS === "web") {
      value = localStorage.getItem(key);
    } else {
      value = await AsyncStorage.getItem(key);
    }

    try {
      return JSON.parse(value || "");
    } catch {
      return value;
    }
  }
}

export const LOCATION_LOCAL_STORAGE_KEY = "CL_WT_WIDGET_LOCATION";
export function saveLocation(location: Location) {
  saveToLocalStorage(LOCATION_LOCAL_STORAGE_KEY, location);
}

export async function getLocation(): Promise<Location> {
  const data = await loadFromLocalStorage(LOCATION_LOCAL_STORAGE_KEY);
  if (data) return data;

  return emptyLocationData;
}

export const WEATHER_LOCAL_STORAGE_KEY = "CL_WT_WIDGET_WEATHER";
export function saveWeather(weather: Weather) {
  saveToLocalStorage(WEATHER_LOCAL_STORAGE_KEY, weather);
}

export async function getWeather(): Promise<Weather> {
  const data = await loadFromLocalStorage(WEATHER_LOCAL_STORAGE_KEY);
  if (data) return data;

  return emptyWeatherData;
}

export const UNIT_LOCAL_STORAGE_KEY = "CL_WT_WIDGET_UNIT";
export function saveUnit(unit: string) {
  saveToLocalStorage(UNIT_LOCAL_STORAGE_KEY, unit);
}

export async function getUnit(): Promise<"metric" | "imperial"> {
  const data = await loadFromLocalStorage(UNIT_LOCAL_STORAGE_KEY);
  if (data) return data;

  return "metric";
}
