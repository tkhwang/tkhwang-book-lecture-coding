import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";

export const KeyboardType = {
  DEFAULT: "default",
  EMAIL: "email-address",
};

export const ReturnKeyTypes = {
  DONE: "done",
  NEXT: "next",
};

const Input = ({
  title,
  placeholder,
  keyboardType,
  returnKeyType,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#a3a3a3"}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        textContentType="none"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

Input.defaultProps = {
  keyboardType: KeyboardType.DEFAULT,
  returnKeyType: ReturnKeyTypes.DONE,
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf(Object.values(KeyboardType)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  secureTextEntry: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
  },
  input: {
    boardWidth: 1,
    boarderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
  },
});

export default Input;