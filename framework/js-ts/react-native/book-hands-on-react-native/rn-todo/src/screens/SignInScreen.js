import { Image, StyleSheet, Text, View } from "react-native";
import Input, { KeyboardType, ReturnKeyTypes } from "../components/Input";

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/main.png")} style={styles.image} />

      <Input
        title={"이메일"}
        placeholder="you@gmail.com"
        keyboardType={KeyboardType.EMAIL}
        returnKeyType={ReturnKeyTypes.NEXT}
      />
      <Input
        title={"비밀번호"}
        returnKeyType={ReturnKeyTypes.DONE}
        secureTextEntry
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SignInScreen;
