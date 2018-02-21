import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Button = ({ onPress, title }) => (
  <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
    <FontAwesome name={title} size={32} color="#ccc" />
  </TouchableOpacity>
);

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 5
  }
});

const PlaybackControls = ({ onPlay, onPause, onStop }) => (
  <View style={styles.container}>
    <Button title="play" onPress={onPlay} />
    <Button title="pause" onPress={onPause} />
    <Button title="stop" onPress={onStop} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default PlaybackControls;
