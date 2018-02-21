import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

import Button from "./Button";

const PodcastDetail = ({ podcast, onRemovePodcast }) => (
  <View style={styles.container}>
    <Image style={styles.img} source={{ uri: podcast.img }} />
    <Text style={styles.header}>{podcast.name}</Text>
    <Button onPress={onRemovePodcast} title={"Remove"} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 5,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 0.5
  },

  img: {
    width: 200,
    height: 200
  },

  header: {
    fontWeight: "bold"
  }
});

export default PodcastDetail;
