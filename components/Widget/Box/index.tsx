import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";

import { UnitContext } from "@/context/UnitContext";
import { WeatherContext } from "@/context/WeatherContext";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { capitalizeWords } from "@/utils";

import GlobalStyle from "@/styles";

export default function Box() {
  const unitContext = useContext(UnitContext);
  const weatherContext = useContext(WeatherContext);

  if (!unitContext) return;
  if (!weatherContext) return;

  const { unit } = unitContext;
  const { weather } = weatherContext;

  const getUnit = () => {
    switch (unit) {
      case "metric":
        return "°C";
      case "imperial":
        return "°F";
    }
  };

  return (
    <ThemedView style={[styles.box, styles.outerBox]}>
      <ThemedView
        style={[
          styles.box,
          styles.innerBox,
          GlobalStyle.flexCenter,
          { height: 182 },
        ]}
      >
        <ThemedView
          style={[
            GlobalStyle.marginBottom,
            GlobalStyle.flexCenter,
            { flexDirection: "row", marginTop: 20 },
          ]}
        >
          <ThemedText type="title" style={{ fontSize: 98 }}>
            {Math.round(weather.main.temp)}
            {getUnit()}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={[
            GlobalStyle.flexBetween,
            GlobalStyle.fullWidth,
            { flexDirection: "row", marginTop: 30 },
          ]}
        >
          <ThemedText type="subtitle">
            High: {Math.round(weather.main.temp_max)}
            {getUnit()}
          </ThemedText>
          <ThemedText type="subtitle">
            Low: {Math.round(weather.main.temp_min)}
            {getUnit()}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView
        style={[
          styles.box,
          styles.innerBox,
          GlobalStyle.marginTop,
          GlobalStyle.flexCenter,
        ]}
      >
        <ThemedText style={{ fontSize: 24 }}>
          Feels like {Math.round(weather.main.feels_like)}
          {getUnit()}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={[
          styles.box,
          styles.innerBox,
          GlobalStyle.marginTop,
          GlobalStyle.flexCenter,
        ]}
      >
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png `,
          }}
          style={{ width: 20 }}
        />
        <ThemedText style={{ fontSize: 24 }}>
          {/* */}
          {capitalizeWords(weather.weather[0].description)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    borderRadius: 12,
  },
  outerBox: {
    minWidth: 320,
    backgroundColor: "#242424",
  },
  innerBox: {
    // minWidth: 300,
    backgroundColor: "#313131",
  },
});
