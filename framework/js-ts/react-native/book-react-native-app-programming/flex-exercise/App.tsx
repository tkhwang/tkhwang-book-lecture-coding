import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TopBar from "./src/screens/TopBar";
import Content from "./src/screens/Content";
import BottomBar from "./src/screens/BottomBar";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <Content />
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
});
