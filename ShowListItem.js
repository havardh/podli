import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight
} from "react-native";

import * as PodcastInfoService from "./PodcastInfoService";

const styles = StyleSheet.create({
  episode: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    height: 80
  },
  avatar: {
    padding: 5
  }
});

export default class ShowListItem extends Component {
  state = {};

  async componentDidMount() {
    const { podcastId } = this.props;
    const podcast = await PodcastInfoService.info(podcastId);
    this.setState({ podcast });
  }

  render() {
    const { onPress } = this.props;

    if (!this.state.podcast) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    const { podcast } = this.state;

    return (
      <TouchableHighlight onPress={() => onPress(podcast)}>
        <View style={styles.episode}>
          <Image
            style={styles.avatar}
            source={{ uri: podcast.img }}
            style={{ width: 60, height: 60 }}
          />
          <View style={styles.details}>
            <Text>{podcast.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
