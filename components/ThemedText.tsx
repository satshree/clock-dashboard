import React from "react";
import { Text, type TextProps, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  muted?: boolean;
  blackText?: boolean;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  muted,
  blackText,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = muted ? Colors.muted : blackText ? "#000" : "#fff";

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600,
    fontFamily: "Inter_600SemiBold",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 32,
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Inter_500Medium",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
