import React, { useContext } from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";

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

  const { width } = useWindowDimensions();
  const breakpoint = width < 1035;

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
    <ThemedView
      style={[
        styles.box,
        styles.outerBox,
        { width: breakpoint ? "100%" : 320 },
      ]}
    >
      <ThemedView
        style={[
          styles.box,
          styles.innerBox,
          GlobalStyle.flexCenter,
          { height: 200 },
        ]}
      >
        <ThemedView
          style={[
            GlobalStyle.marginBottom,
            GlobalStyle.flexCenter,
            { flexDirection: "row", marginTop: 25 },
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
      <ThemedView style={[styles.box, styles.innerBox, GlobalStyle.marginTop]}>
        <ThemedText
          style={[GlobalStyle.fullWidth, { fontSize: 22, textAlign: "center" }]}
        >
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
          { padding: 6.5 },
        ]}
      >
        <ThemedView style={[GlobalStyle.flexCenter, { flexDirection: "row" }]}>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png `,
            }}
            style={{ width: 40, height: 40 }}
          />
          <ThemedText style={{ fontSize: 22, marginTop: 8 }}>
            {capitalizeWords(weather.weather[0].description)}
          </ThemedText>
        </ThemedView>
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
    // width: 320,
    backgroundColor: "#242424",
  },
  innerBox: {
    // width: 300,
    backgroundColor: "#313131",
  },
});
