import Icon from "@expo/vector-icons/MaterialIcons";
import queryString from "query-string";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import WebView from "react-native-webview";

const YT_WIDTH = Dimensions.get("window").width;
const YT_HEIGHT = YT_WIDTH * (9 / 16);

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default function App() {
  const webViewRef = useRef<WebView | null>(null);
  const seekBarAnimRef = useRef(new Animated.Value(0));

  const [url, setUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("DsXtaEXpTnA");
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationInSec, setDurationInSec] = useState(0);
  const [currentTimeInSec, setCurrentTimeInSec] = useState(0);

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

  const source = useMemo(() => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        </head>
        <body style="margin: 0; padding: 0;">
          <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
          <div id="player"></div>

          <script>
            // 2. This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // 3. This function creates an <iframe> (and YouTube player)
            //    after the API code downloads.
            var player;
            function onYouTubeIframeAPIReady() {
              player = new YT.Player('player', {
                height: '${YT_HEIGHT}',
                width: '${YT_WIDTH}',
                videoId: '${youtubeId}',
                playerVars: {
                  'playsinline': 1
                },
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
              });
            }

            function postMessageToRN(type, data) {
              const message = JSON.stringify({ type, data });
              window.ReactNativeWebView.postMessage(message);
            }

            function onPlayerReady(event) {
              postMessageToRN("duration", player.getDuration());
            }

            function onPlayerStateChange(event) {
              postMessageToRN("player-state", event.data);
            }
         </script>
        </body>
      </html>    
    `;
    return { html };
  }, [youtubeId]);

  const onPressPlay = useCallback(() => {
    if (webViewRef.current !== null) {
      webViewRef.current.injectJavaScript("player.playVideo();");
    }
  }, [webViewRef]);

  const onPressPause = useCallback(() => {
    if (webViewRef.current !== null) {
      webViewRef.current.injectJavaScript("player.pauseVideo();");
    }
  }, [webViewRef]);

  const durationText = useMemo(() => {
    return `${formatTime(Math.floor(durationInSec))}`;
  }, [durationInSec]);

  const currentTimeText = useMemo(() => {
    return `${formatTime(Math.floor(currentTimeInSec))}`;
  }, [currentTimeInSec]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (webViewRef.current !== null) {
          webViewRef.current.injectJavaScript(`postMessageToRN("current-time", player.getCurrentTime());`);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    Animated.timing(seekBarAnimRef.current, {
      toValue: currentTimeInSec,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [currentTimeInSec]);

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
      <View style={styles.youtubeContainer}>
        {youtubeId.length > 0 && (
          <WebView
            ref={webViewRef}
            source={source}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            onMessage={(event) => {
              console.log(`[+][App|onMessage] data = ${event.nativeEvent.data}`);
              const { type, data } = JSON.parse(event.nativeEvent.data);

              if (type === "player-state") {
                setIsPlaying(data === 1);
              } else if (type === "duration") {
                setDurationInSec(data);
              } else if (type === "current-time") {
                setCurrentTimeInSec(data);
              }
            }}
          />
        )}
      </View>
      <View style={styles.seekBarBackground}>
        <Animated.View
          style={[
            styles.seekBarProgress,
            {
              width: seekBarAnimRef.current.interpolate({
                inputRange: [0, durationInSec],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.seekBarThumb,
            {
              left: seekBarAnimRef.current.interpolate({
                inputRange: [0, durationInSec],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <Text style={styles.timeText}>{`${currentTimeText} / ${durationText}`}</Text>
      <View style={styles.controller}>
        {isPlaying ? (
          <TouchableOpacity style={styles.playButton}>
            <Icon name="pause-circle" size={40} color="#00DDA8" onPress={onPressPause} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.playButton}>
            <Icon name="play-circle" size={40} color="#00DDA8" onPress={onPressPlay} />
          </TouchableOpacity>
        )}
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
  youtubeContainer: {
    width: YT_WIDTH,
    height: YT_HEIGHT,
    backgroundColor: "#4A4A4A",
  },
  controller: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 72,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  playButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    color: "#AEAEB2",
    alignSelf: "flex-end",
    fontSize: 13,
    marginTop: 15,
    marginRight: 20,
  },
  seekBarBackground: {
    backgroundColor: "#D4D4D4",
    height: 3,
  },
  seekBarProgress: {
    backgroundColor: "#00DDA8",
    height: 3,
    width: "0%",
  },
  seekBarThumb: {
    backgroundColor: "#00DDA8",
    height: 14,
    width: 14,
    borderRadius: 7,
    position: "absolute",
    top: (-14 + 3) / 2,
  },
});
