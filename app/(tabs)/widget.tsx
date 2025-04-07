import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import {
  activateKeepAwakeAsync,
  deactivateKeepAwake,
  isAvailableAsync,
} from "expo-keep-awake";
import * as NavigationBar from "expo-navigation-bar";

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
import useWakeLock from "@/hooks/useWakeLock";

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
  const breakpoint = width < 568;

  const [fetched, setFetched] = useState(false);

  const { releaseWakeLock } = useWakeLock();

  const navBarVisibility = NavigationBar.useVisibility();

  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(() => {
      fetchWeather();
    }, 30 * 60 * 1000);

    // KEEP SCREEN AWAKE
    if (Platform.OS !== "web") {
      const awake = async () => {
        if (await isAvailableAsync()) {
          await activateKeepAwakeAsync();
        } else {
          alert(
            "Wake lock is not supported. Change your device’s settings to never sleep the display."
          );
        }
      };
      awake();
    }

    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (Platform.OS !== "web") deactivateKeepAwake();
      clearInterval(weatherInterval);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      // GO FULLSCREEN FOR WEB
      try {
        // if (document.fullscreenElement)
        document.documentElement.requestFullscreen();
      } catch (err) {
        console.log("Error", err);
      }
      window.addEventListener("keydown", handleEsc);

      return () => {
        window.removeEventListener("keydown", handleEsc);
        releaseWakeLock();
      };
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      let timeout: NodeJS.Timeout;
      if (navBarVisibility === "visible") {
        timeout = setTimeout(
          () =>
            NavigationBar.setVisibilityAsync("hidden").then(() => {
              NavigationBar.setBehaviorAsync("inset-swipe");
            }),
          5000
        );
      }

      return () => {
        if (timeout) clearTimeout(timeout);
        if (navBarVisibility === "hidden")
          NavigationBar.setVisibilityAsync("visible");
      };
    }
  }, [navBarVisibility]);

  const handleEsc = (event: KeyboardEvent) => {
    // ESCAPE FULLSCREEN
    if (Platform.OS === "web" && event.key === "Escape") {
      router.push("/");
    }
  };

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
      useNativeDriver: Platform.OS !== "web",
    }).start();

    if (Platform.OS === "android") NavigationBar.setVisibilityAsync("visible");

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
      useNativeDriver: Platform.OS !== "web",
    }).start();
  };

  return (
    <Pressable
      style={[GlobalStyle.fullScreen, { cursor: "pointer" }]}
      onPress={showButton}
    >
      <ThemedView
        style={[
          GlobalStyle.fullScreen,
          GlobalStyle.flexBetween,
          {
            padding: 20,
            flexDirection: "row",
            backgroundColor: Colors.dark.background,
          },
        ]}
      >
        {fetched ? (
          <>
            <ThemedView
              style={[
                GlobalStyle.flexCenter,
                {
                  flexDirection: "row",
                  // width: "30%",
                  // height: "100%",
                  width: breakpoint ? "100%" : "30%",
                  height: breakpoint ? "auto" : "100%",
                },
              ]}
            >
              <Box />
            </ThemedView>
            <ThemedView
              style={[
                GlobalStyle.flexCenter,
                {
                  flexDirection: "row",
                  // width: "70%",
                  // height: "100%",
                  width: breakpoint ? "100%" : "70%",
                  height: breakpoint ? "auto" : "100%",
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
                {/* {Platform.OS === "web" && !document.fullscreenEnabled && (
                  <ThemedView style={[GlobalStyle.flexCenter]}>
                    <Pressable
                      onPress={() =>
                        document.documentElement.requestFullscreen()
                      }
                    >
                      <ThemedText>Go full screen</ThemedText>
                    </Pressable>
                  </ThemedView>
                )} */}
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
              left: Platform.OS === "web" ? "auto" : "50%",
              right: "auto",
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
