import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { Colors } from "@/constants/Colors";
import GlobalStyle from "@/styles";

interface RadioProps {
  options: {
    text: string;
    value: string;
  }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function Radio(props: RadioProps) {
  const [selected, setSelected] = useState("");

  useEffect(() => setSelected(props.selected), [props.selected]);

  return (
    <ThemedView style={[GlobalStyle.flexBetween, { flexDirection: "row" }]}>
      {props.options.map((option) => (
        <Pressable
          key={option.value}
          style={[GlobalStyle.flexCenter, { flexDirection: "row" }]}
          onPress={() => props.onChange(option.value)}
        >
          <ThemedView
            style={[
              GlobalStyle.flexCenter,
              { flexDirection: "row", marginTop: 1.5 },
              styles.radio,
              selected === option.value
                ? styles.radioChecked
                : styles.radioUnchecked,
            ]}
          />
          <ThemedView style={[{ marginLeft: 5 }]}>
            <ThemedText blackText={true}>{option.text}</ThemedText>
          </ThemedView>
        </Pressable>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: "50%",
    borderColor: "#D4D4D4",
  },
  radioUnchecked: {
    backgroundColor: "#fff",
  },
  radioChecked: {
    backgroundColor: Colors.primary,
  },
});
