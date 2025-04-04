import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Colors } from "@/constants/Colors";

import GlobalStyle from "@/styles";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  return (
    <ThemedView
      style={[
        GlobalStyle.fullScreen,
        GlobalStyle.flexBetween,
        {
          flexDirection: "column",
          backgroundColor: Colors.dark.background,
        },
      ]}
    >
      <ThemedView></ThemedView>
      <ThemedView style={[GlobalStyle.flexBetween, { height: "50%" }]}>
        <ThemedView>
          <ThemedText>Hello World</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText>Hello World</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
