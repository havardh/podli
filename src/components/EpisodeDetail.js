import React from "react";

import { StyleSheet, Image, Text, View } from "react-native";

const EpisodeDetail = ({ episode, podcast }) => (
  <View style={styles.container}>
    <Image style={styles.img} source={{ uri: episode.img }} />
    <View style={styles.details}>
      <Text style={styles.detailsHead}>{podcast.name}</Text>
      <Text>{episode.title}</Text>
      <Text>{episode.guests.join(", ")}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  img: {
    width: 200,
    height: 200
  },
  details: {},
  detailsHead: {
    fontWeight: "bold"
  }
});

export default EpisodeDetail;
