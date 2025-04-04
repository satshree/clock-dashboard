import React, { useState } from "react";
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
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onClick}
    >
      <ThemedView
        style={[
          GlobalStyle.flexCenter,
          styles.button,
          pressed
            ? styles.buttonPressedBackground
            : styles.buttonDefaultBackground,
        ]}
      >
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
    // transitionProperty: "backgroundColor",
  },
  buttonDefaultBackground: {
    backgroundColor: "#51ACF6",
  },
  buttonPressedBackground: {
    backgroundColor: "#1b95f7",
  },
});
