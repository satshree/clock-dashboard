import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import GlobalStyle from "@/styles";

interface ButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <Pressable onPress={props.onClick}>
      <ThemedView style={[GlobalStyle.flexCenter, styles.button]}>
        <ThemedText>{props.text}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 40,
    borderRadius: 12,
    backgroundColor: "#51ACF6",
  },
});
