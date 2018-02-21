import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MinuteSeconds from "./MinuteSeconds";

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  }
});

const PlaybackProgress = ({ position, durationMillis }) => (
  <View style={styles.container}>
    <Text>
      <MinuteSeconds millis={position * durationMillis} />
      /
      <MinuteSeconds millis={durationMillis} />
    </Text>
  </View>
);

export default PlaybackProgress;
