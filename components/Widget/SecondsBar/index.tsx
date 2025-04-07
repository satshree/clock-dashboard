import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { ThemedView } from "@/components/ThemedView";

import { getSeconds } from "@/utils/time";
import GlobalStyle from "@/styles";

export default function SecondsBar() {
  const [second, setSeconds] = useState(0);

  const { width } = useWindowDimensions();
  const breakpoint = width < 568;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getBarProgress = () => (second / 60) * 100;

  return (
    <ThemedView
      style={[
        GlobalStyle.flexCenter,
        GlobalStyle.fullWidth,
        {
          flexDirection: "row",
          maxWidth: 800,
          marginTop: breakpoint ? 50 : 100,
        },
      ]}
    >
      <ThemedView style={[styles.bar]}>
        <ThemedView
          style={[
            styles.innerBar,
            {
              width: `${getBarProgress()}%`,
              borderTopRightRadius: getBarProgress() === 100 ? 12 : 0,
              borderBottomRightRadius: getBarProgress() === 100 ? 12 : 0,
            },
          ]}
        ></ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 15,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
  },
  innerBar: {
    height: 15,
    backgroundColor: "#6D6D6D",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
});
