import React from "react";
import { Stack } from "expo-router";

import ContextProvider from "@/context";

export default function TabLayout() {
  return (
    <ContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="widget" />
      </Stack>
    </ContextProvider>
  );
}
