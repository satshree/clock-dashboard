import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";

import getWeather from "@/api/weather";

import { UnitContext } from "@/context/UnitContext";
import { WeatherContext } from "@/context/WeatherContext";
import { LocationContext } from "@/context/LocationContext";

import Box from "@/components/Widget/Box";
import Clock from "@/components/Widget/Clock";
import CloseButton from "@/components/CloseButton";
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

  const BUTTON_VISIBLE_Y = -30;
  const BUTTON_HIDDEN_Y = 100;

  const slideAnim = useRef(new Animated.Value(BUTTON_HIDDEN_Y)).current;
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const weatherInterval = setInterval(() => {
      fetchWeather();
    }, 30 * 60 * 1000);

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
      try {
        // if (document.fullscreenElement)
        document.documentElement.requestFullscreen();
      } catch (err) {
        console.log("Error", err);
      }
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      if (Platform.OS === "web") {
        window.removeEventListener("keydown", handleEsc);
      }

      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      clearInterval(weatherInterval);
    };
  }, []);

  const fetchWeather = async () => {
    try {
      const weatherResponse = await getWeather(
        location[0].lat,
        location[0].lon,
        unit
      );
      updateWeather(weatherResponse);
      setFetched(true);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const showButton = () => {
    Animated.timing(slideAnim, {
      toValue: BUTTON_VISIBLE_Y,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Reset timer
    if (hideTimeout.current) clearTimeout(hideTimeout.current);

    hideTimeout.current = setTimeout(() => {
      hideButton();
    }, 5000);
  };

  const hideButton = () => {
    Animated.timing(slideAnim, {
      toValue: BUTTON_HIDDEN_Y,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable style={[GlobalStyle.fullScreen]} onPress={showButton}>
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
            <ThemedView style={[{ width: breakpoint ? "100%" : 350 }]}>
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
                {Platform.OS === "web" && !document.fullscreenEnabled && (
                  <ThemedView style={[GlobalStyle.flexCenter]}>
                    <Pressable
                      onPress={() =>
                        document.documentElement.requestFullscreen()
                      }
                    >
                      <ThemedText>Go full screen</ThemedText>
                    </Pressable>
                  </ThemedView>
                )}
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
        <ThemedText style={styles.closeTooltip} muted={true}>
          Tap anywhere to go back
        </ThemedText>
        <Animated.View
          style={[
            GlobalStyle.fullWidth,
            GlobalStyle.flexCenter,
            {
              transform: [{ translateY: slideAnim }],
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
            },
          ]}
        >
          <CloseButton />
        </Animated.View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  closeTooltip: {
    position: "absolute",
    bottom: 5,
    right: 20,
    fontSize: 8,
  },
});
