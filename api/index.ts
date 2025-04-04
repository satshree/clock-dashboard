import axios from "axios";

import { OPENWEATHER_API_KEY } from "@/constants";

const openWeatherAPIRequest = axios.create({
  baseURL: "https://api.openweathermap.org",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ADD API KEY
openWeatherAPIRequest.interceptors.request.use((config) => {
  config.url += `&appid=${OPENWEATHER_API_KEY}`;
  return config;
});

export default openWeatherAPIRequest;
