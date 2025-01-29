import Icon from "@expo/vector-icons/MaterialIcons";
import queryString from "query-string";
import { useCallback, useState } from "react";
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [url, setUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");

  const onPressOpenLink = useCallback(() => {
    console.log("TCL: onPressOpenLink:", url);
    const {
      query: { v: id },
    } = queryString.parseUrl(url);

    if (typeof id === "string") {
      setYoutubeId(id);
    } else {
      Alert.alert("잘못된 URL입니다.");
    }
  }, [url]);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="클릭하여 링크를 삽입하세요."
          placeholderTextColor={"#AEAEB2"}
          onChangeText={(text) => setUrl(text)}
          value={url}
          inputMode="url"
        />
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={onPressOpenLink}>
          <Icon name="add-link" size={24} color="#AEAEB2" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#242424",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inputContainer: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  input: {
    fontSize: 16,
    color: "#AEAEB2",
    flex: 1,
    marginRight: 4,
  },
});
