import React from "react";
import { Image, Platform, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CloseButton() {
  const router = useRouter();

  const handleButtonClick = () => {
    if (Platform.OS === "web") {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
      } catch (err) {
        console.log("ERROR", err);
      }
    }

    router.push("/");
  };

  return (
    <Pressable style={styles.closeButton} onPress={handleButtonClick}>
      {Platform.OS === "web" ? (
        <Image
          source={require("@/assets/icons/x.svg")}
          width={24}
          height={24}
          alt="Close"
        />
      ) : (
        <Image
          source={require("@/assets/icons/x.png")}
          width={24}
          height={24}
          alt="Close"
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    padding: 15,
    borderRadius: "50%",
    backgroundColor: "#adadad",
  },
});
