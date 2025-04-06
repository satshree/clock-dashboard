import React, { useEffect, useState } from "react";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import GlobalStyle from "@/styles";

export default function DateWidget() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date();

      if (date.getDate() !== newDate.getDate()) setDate(newDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getMonth = () => {
    switch (date.getMonth() + 1) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
    }
  };

  const getDay = () => {
    const day = date.getDate();

    if (day === 1) return `${day}st`;
    if (day === 2) return `${day}nd`;
    if (day === 3) return `${day}rd`;

    return `${day}th`;
  };

  return (
    <ThemedView style={[GlobalStyle.fullWidth, GlobalStyle.marginTop]}>
      <ThemedText
        type="defaultSemiBold"
        style={{ fontSize: 36, textAlign: "center" }}
      >
        {getMonth()} {getDay()}, {date.getFullYear()}
      </ThemedText>
    </ThemedView>
  );
}
