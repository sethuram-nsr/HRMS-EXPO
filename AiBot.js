import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { View, Dimensions, Platform, Keyboard, StyleSheet, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AiBot({ navigation }) {

  const screenHeight = Dimensions.get('window').height;
  const [webViewHeight, setWebViewHeight] = useState(screenHeight - 100);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(showEvent, handleKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener(hideEvent, handleKeyboardHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    setWebViewHeight(screenHeight - 350);
  };

  const handleKeyboardHide = () => {
    setWebViewHeight(screenHeight - 100);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
        </Pressable>

        <Text style={styles.maintext}>AlphaDot Chatbot</Text>
      </View>

      <View style={{ height: webViewHeight }}>
        <WebView
          originWhitelist={["*"]}
          mixedContentMode="always"
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          source={require("./assets/bot.html")}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />


      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  maintext: {
    fontWeight: "400",
    fontSize: 20
  },
  header: {
    width: "100%",
    height: 65,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: "row",
    alignItems: "center"
  }
});
