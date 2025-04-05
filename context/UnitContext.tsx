import { getUnit, saveUnit } from "@/utils/localStorage";
import React, { createContext, ReactNode, useState } from "react";

interface UnitContextType {
  unit: "metric" | "imperial";
  updateUnit: (unit: "metric" | "imperial") => void;
}

export const UnitContext = createContext<UnitContextType | undefined>(
  undefined
);

export default function UnitProvider({ children }: { children: ReactNode }) {
  const localValue = getUnit();
  const [unit, setUnit] = useState(localValue);

  const updateUnit = (u: "metric" | "imperial") => {
    setUnit(u);
    saveUnit(u);
  };
  return (
    <UnitContext.Provider value={{ unit, updateUnit }}>
      {children}
    </UnitContext.Provider>
  );
}
