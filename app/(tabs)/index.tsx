import React, { useState } from "react";
import {
  // StyleSheet,
  useWindowDimensions,
} from "react-native";

import Card from "@/components/Card";
import Radio from "@/components/Radio";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Colors } from "@/constants/Colors";

import GlobalStyle from "@/styles";

const unitOptions = [
  {
    text: "Metric (Celsius)",
    value: "metric",
  },
  {
    text: "Imperial (Fahrenheit)",
    value: "imperial",
  },
];

export default function HomeScreen() {
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("metric");

  const { width } = useWindowDimensions();

  const isSmallScreen = width < 568;

  return (
    <ThemedView
      style={[
        GlobalStyle.fullScreen,
        GlobalStyle.flexBetween,
        {
          padding: 10,
          flexDirection: "column",
          backgroundColor: Colors.dark.background,
        },
      ]}
    >
      {!isSmallScreen && <ThemedView></ThemedView>}

      <ThemedView
        style={[
          GlobalStyle.flexBetween,
          GlobalStyle.fullWidth,
          {
            flexDirection: isSmallScreen ? "column" : "row",
            marginTop: isSmallScreen ? 100 : 0,
          },
        ]}
      >
        <ThemedView
          style={[
            GlobalStyle.flexCenter,
            {
              width: isSmallScreen ? "100%" : "50%",
              marginBottom: isSmallScreen ? 100 : 0,
            },
          ]}
        >
          <ThemedText type="title">Clock and Weather Widget</ThemedText>
        </ThemedView>
        <ThemedView
          style={[
            GlobalStyle.flexCenter,
            {
              width: isSmallScreen ? "100%" : "50%",
              marginTop: isSmallScreen ? 20 : 0,
            },
          ]}
        >
          <Card>
            <ThemedText blackText={true} type="subtitle">
              Select your location
            </ThemedText>
            <ThemedView style={GlobalStyle.marginTop}>
              <Input
                placeholder="Start by typing city name..."
                value={location}
                onChange={setLocation}
              />
            </ThemedView>
          </Card>
          <ThemedView style={[GlobalStyle.marginTop, GlobalStyle.marginBottom]}>
            <Card>
              <ThemedText blackText={true} type="subtitle">
                Select your Unit
              </ThemedText>
              <ThemedView style={GlobalStyle.marginTop}>
                <Radio
                  options={unitOptions}
                  selected={unit}
                  onChange={setUnit}
                />
              </ThemedView>
            </Card>
          </ThemedView>
          <Button text="Show Widget" />
        </ThemedView>
      </ThemedView>

      <ThemedView style={[GlobalStyle.flexCenter, GlobalStyle.fullWidth]}>
        <ThemedText muted={true}>Made by Satshree Shrestha</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// const styles = StyleSheet.create({});
