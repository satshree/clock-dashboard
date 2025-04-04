import openWeatherAPIRequest from ".";

export type Weather = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: {
    temp: number;
    feels_like: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
  daily: {
    summary: string;
    temp: {
      min: number;
      max: number;
    };
  }[];
};

export const emptyWeatherData: Weather = {
  lat: 0,
  lon: 0,
  timezone: "",
  timezone_offset: 0,
  hourly: [],
  daily: [],
};

export default async function getWeather(
  lat: number,
  lon: number,
  unit: "metric" | "imperial"
): Promise<Weather> {
  const response = await openWeatherAPIRequest.get(
    `/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=${unit}`
  );

  return response.data;
}
