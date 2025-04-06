import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { ThemedView } from "../ThemedView";

import { Colors } from "@/constants/Colors";

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input(props: InputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => setValue(props.value), [props.value]);

  return (
    <ThemedView>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, focused && styles.inputFocused]}
        value={value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.placeholder}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#D4D4D4",
    padding: 10,
    backgroundColor: "#fff",
    // transition: "outline 0.2 ease",
  },
  inputFocused: {
    outlineColor: "#1b95f7",
  },
});
