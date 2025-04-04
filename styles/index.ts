import { StyleSheet } from "react-native";

// import { Colors } from "@/constants/Colors";

const GlobalStyle = StyleSheet.create({
  fullScreen: {
    height: "100%",
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  // darkText: {
  //   color: Colors.dark.text,
  // },
  flexBetween: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  flexCenter: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export default GlobalStyle;
