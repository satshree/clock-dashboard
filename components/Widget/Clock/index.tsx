import React, { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

import { WeatherContext } from "@/context/WeatherContext";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { getTimeAfterShiftFromUTC } from "@/utils/time";

import GlobalStyle from "@/styles";

export default function Clock() {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) return;

  const { weather } = weatherContext;

  const { width } = useWindowDimensions();
  const breakpoint = width < 568;

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmPm] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeAfterShiftFromUTC(weather.timezone);

      setHour(time.hour);
      setMinute(time.minutes);
      setAmPm(time.ampm);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemedView
      style={[
        GlobalStyle.flexCenter,
        {
          flexDirection: "row",
          marginTop: 80,
          marginBottom: breakpoint ? 10 : 50,
        },
      ]}
    >
      <ThemedText
        type="defaultSemiBold"
        style={{ fontSize: breakpoint ? 86 : 230 }}
      >
        {hour}:{minute}
      </ThemedText>
      <ThemedText
        type="defaultSemiBold"
        style={{ fontSize: breakpoint ? 45 : 65 }}
      >
        {ampm}
      </ThemedText>
    </ThemedView>
  );
}
