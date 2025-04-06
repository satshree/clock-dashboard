import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { ThemedView } from "../ThemedView";

// import GlobalStyle from "@/styles";

interface CardProps {
  children: ReactNode;
}

export default function Card(props: CardProps) {
  return <ThemedView style={[styles.card]}>{props.children}</ThemedView>;
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 12,
    borderColor: "#D4D4D4",
    backgroundColor: "#EAEAEA",
    width: "100%",
    maxWidth: 400,
    // minWidth: 300,
  },
});
