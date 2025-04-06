import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Platform, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";

import getWeather from "@/api/weather";

import { UnitContext } from "@/context/UnitContext";
import { WeatherContext } from "@/context/WeatherContext";
import { LocationContext } from "@/context/LocationContext";

import Box from "@/components/Widget/Box";
import Clock from "@/components/Widget/Clock";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SecondsBar from "@/components/Widget/SecondsBar";
import DateWidget from "@/components/Widget/DateWidget";

import { Colors } from "@/constants/Colors";

import GlobalStyle from "@/styles";

export default function Widget() {
  const unitContext = useContext(UnitContext);
  const weatherContext = useContext(WeatherContext);
  const locationContext = useContext(LocationContext);

  if (!unitContext) return;
  if (!weatherContext) return;
  if (!locationContext) return;

  const router = useRouter();

  const { unit } = unitContext;
  const { location } = locationContext;
  const { updateWeather } = weatherContext;

  const { width } = useWindowDimensions();
  const breakpoint = width < 1035;

  const [fetched, setFetched] = useState(false);

  // KEEP SCREEN AWAKE
  useKeepAwake();

  useEffect(() => {
    fetchWeather();

    const handleEsc = (event: KeyboardEvent) => {
      // ESCAPE FULLSCREEN
      if (Platform.OS === "web" && event.key === "Escape") {
        // try {
        //   if (document.exitFullscreen) document.exitFullscreen();
        // } catch (err) {
        //   console.log("Error", err);
        // }

        router.push("/");
      }
    };

    if (Platform.OS === "web") {
      // GO FULLSCREEN FOR WEB
      document.documentElement.requestFullscreen();
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      if (Platform.OS === "web") {
        window.removeEventListener("keydown", handleEsc);
      }
    };
  }, []);

  const fetchWeather = async () => {
    const weatherResponse = await getWeather(
      location[0].lat,
      location[0].lon,
      unit
    );
    updateWeather(weatherResponse);
    setFetched(true);
  };

  return (
    <ThemedView
      style={[
        GlobalStyle.fullScreen,
        GlobalStyle.flexBetween,
        {
          padding: 20,
          flexDirection: breakpoint ? "column" : "row",
          backgroundColor: Colors.dark.background,
        },
      ]}
    >
      {fetched ? (
        <>
          <ThemedView style={[{ width: breakpoint ? "100%" : "30%" }]}>
            <Box />
          </ThemedView>
          <ThemedView
            style={[
              {
                width: breakpoint ? "100%" : "70%",
                padding: 20,
              },
            ]}
          >
            <ThemedView>
              <Clock />
            </ThemedView>
            <ThemedView
              style={[
                GlobalStyle.flexCenter,
                GlobalStyle.fullWidth,
                { flexDirection: "column" },
              ]}
            >
              <SecondsBar />
            </ThemedView>
            <ThemedView style={[GlobalStyle.marginTop]}>
              <DateWidget />
            </ThemedView>
          </ThemedView>
        </>
      ) : (
        <>
          <ThemedView style={[GlobalStyle.flexCenter, GlobalStyle.fullWidth]}>
            <ThemedText style={[GlobalStyle.flexCenter]}>
              <ActivityIndicator
                size="small"
                color={Colors.primary}
                style={{ marginRight: 10 }}
              />
              Fetching weather...
            </ThemedText>
          </ThemedView>
        </>
      )}
    </ThemedView>
  );
}
