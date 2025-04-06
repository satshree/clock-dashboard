import openWeatherAPIRequest from ".";

export type Location = {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
}[];

export const emptyLocationData: Location = [];

export default async function getLocation(cityName: string): Promise<Location> {
  const response = await openWeatherAPIRequest.get(
    `/geo/1.0/direct?q=${cityName}`
  );

  return response.data;
}
