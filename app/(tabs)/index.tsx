import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  // StyleSheet,
  useWindowDimensions,
} from "react-native";

import useDebounce from "@/hooks/useDebounce";

import getLocation, { emptyLocationData } from "@/api/location";

import { UnitContext } from "@/context/UnitContext";
import { LocationContext } from "@/context/LocationContext";

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
  const unitContext = useContext(UnitContext);
  const locationContext = useContext(LocationContext);

  if (!unitContext) return;
  if (!locationContext) return;

  const { width } = useWindowDimensions();
  const isSmallScreen = width < 568;

  const { unit, updateUnit } = unitContext;
  const { location, updateLocation } = locationContext;

  const [cityName, setCityName] = useState("");
  const [locationTooltip, setLocationTooltip] = useState("");
  const debouncedLocation = useDebounce(cityName);

  useEffect(() => {
    if (debouncedLocation) fetchLocation();
  }, [debouncedLocation]);

  useEffect(() => {
    if (location.length > 0 && location[0].name !== "") {
      setCityName(location[0].name);
    }
  }, []);

  const fetchLocation = async () => {
    try {
      const locationResponse = await getLocation(debouncedLocation);

      if (locationResponse.length === 0) {
        setLocationTooltip(`Cannot find city named '${debouncedLocation}'`);
        updateLocation(emptyLocationData);
      } else {
        setLocationTooltip(
          `${locationResponse[0].name} (${
            locationResponse[0].state ?? locationResponse[0].country
          }) ✅`
        );
        updateLocation(locationResponse);
      }
    } catch (err) {
      console.log("Error");

      updateLocation(emptyLocationData);
      setLocationTooltip("Something went wrong. Please try again.");
    }
  };

  const handleCityNameChange = (c: string) => {
    setCityName(c);

    if (c === "") {
      setLocationTooltip("");
      updateLocation(emptyLocationData);
    } else {
      setLocationTooltip("...");
    }
  };

  const handleSubmit = () => {
    if (debouncedLocation === "") {
      alert("Please enter location/city name.");
      return;
    }

    if (location.length === 0) {
      alert("Please enter valid location/city name.");
      return;
    }

    alert(`${location[0].name} ${unit}`);
  };

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
                value={cityName}
                onChange={handleCityNameChange}
              />

              {locationTooltip === "..." ? (
                <ThemedView
                  style={[{ marginTop: 7, alignItems: "flex-start" }]}
                >
                  <ActivityIndicator size="small" color={Colors.primary} />
                </ThemedView>
              ) : (
                <ThemedText
                  blackText={true}
                  style={{ marginTop: 5, fontSize: 13 }}
                >
                  {locationTooltip}
                </ThemedText>
              )}
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
                  onChange={(value) => {
                    if (value === "metric" || value === "imperial") {
                      updateUnit(value);
                    } else {
                      updateUnit("metric");
                    }
                  }}
                />
              </ThemedView>
            </Card>
          </ThemedView>
          <Button text="Show Widget" onClick={handleSubmit} />
        </ThemedView>
      </ThemedView>

      <ThemedView style={[GlobalStyle.flexCenter, GlobalStyle.fullWidth]}>
        <ThemedText muted={true}>Made by Satshree Shrestha</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// const styles = StyleSheet.create({});
