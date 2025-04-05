import React, { useContext, useEffect, useState } from "react";

import { WeatherContext } from "@/context/WeatherContext";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { getTimeAfterShiftFromUTC } from "@/utils/time";

import GlobalStyle from "@/styles";

export default function Clock() {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) return;

  const { weather } = weatherContext;

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
      style={[GlobalStyle.flexCenter, { flexDirection: "row", marginTop: 110 }]}
    >
      <ThemedText type="defaultSemiBold" style={{ fontSize: 225 }}>
        {hour}:{minute}
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={{ fontSize: 65 }}>
        {ampm}
      </ThemedText>
    </ThemedView>
  );
}
