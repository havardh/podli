import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

import * as PodcastInfoService from "../services/PodcastInfoService";
import * as EpisodeInfoService from "../services/EpisodeInfoService";

const styles = StyleSheet.create({
  episode: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    margin: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 80,
    backgroundColor: "#fff"
  },
  avatar: {
    padding: 5
  },
  details: {
    marginLeft: 5
  },
  detailsHead: {
    fontWeight: "bold"
  }
});

export default class EpisodeListItem extends Component {
  state = {};

  async componentDidMount() {
    const { podcastId, episodeId } = this.props;
    const podcast = await PodcastInfoService.info(podcastId);
    const episode = await EpisodeInfoService.info(podcastId, episodeId);
    this.setState({ episode, podcast });
  }

  render() {
    const { onPress } = this.props;

    if (!this.state.episode) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    const { episode, podcast } = this.state;

    return (
      <TouchableHighlight onPress={() => onPress(episode)}>
        <View style={styles.episode}>
          <Image
            style={styles.avatar}
            source={{ uri: episode.img }}
            style={{ width: 60, height: 60 }}
          />
          <View style={styles.details}>
            <Text style={styles.detailsHead}>{podcast.name}</Text>
            <Text>{episode.title}</Text>
            <Text>{episode.guests.join(", ")}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
