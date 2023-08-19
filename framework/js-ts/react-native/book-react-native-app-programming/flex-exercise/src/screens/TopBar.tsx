import React from "react";
import { StyleSheet, Text, View } from "react-native";

const title = "TopBar";
export default function TopBar() {
  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { padding: 5, backgroundColor: "blue" },
  text: { fontSize: 20, color: "white" },
});
