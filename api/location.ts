import openWeatherAPIRequest from ".";

export type Location = {
  name: string;
  lat: number;
  lon: number;
}[];

export default async function getLocation(cityName: string): Promise<Location> {
  const response = await openWeatherAPIRequest.get(
    `/geo/1.0/direct?q=${cityName}`
  );

  return response.data;
}
