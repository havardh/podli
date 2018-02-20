import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const PlaybackControls = ({ onPlay, onPause, onStop }) => (
  <View>
    <View style={styles.button}>
      <Button title="▶️" onPress={onPlay} />
    </View>
    <View style={styles.button}>
      <Button style={styles.button} title="⏸️" onPress={onPause} />
    </View>
    <View style={styles.button}>
      <Button style={styles.button} title="⏹️" onPress={onStop} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: "20%"
  }
});

export default PlaybackControls;
