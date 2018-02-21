import React, { Component } from "react";
import { isEqual } from "lodash";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

import * as PodcastInfoService from "../services/PodcastInfoService";
import * as EpisodeInfoService from "../services/EpisodeInfoService";
import ProgressStore from "../stores/ProgressStore";
import Loading from "./Loading";
import styles from "../styles/Item";

const progressStyle = position => ({
  width: 100 * position + "%",
  height: 1,
  backgroundColor: "#111"
});

export default class EpisodeListItem extends Component {
  state = {};

  async componentDidMount() {
    const { podcastId, episodeId } = this.props;
    const podcast = await PodcastInfoService.info(podcastId);
    const episode = await EpisodeInfoService.info(podcastId, episodeId);
    const position = ProgressStore.getPosition({ podcastId, episodeId });
    this.setState({ episode, podcast, position });
    ProgressStore.addListener(this.onProgressChange);
  }

  componentWillUnmount() {
    ProgressStore.removeListener(this.onProgressChange);
  }

  onProgressChange = () => {
    const { podcastId, episodeId } = this.props;
    this.setState({
      position: ProgressStore.getPosition({ podcastId, episodeId })
    });
  };

  render() {
    const { onPress } = this.props;

    if (!this.state.episode) {
      return <Loading />;
    }
    const { episode, podcast, position } = this.state;

    return (
      <TouchableHighlight onPress={() => onPress(episode)}>
        <View style={styles.container}>
          <View style={progressStyle(position)} />
          <View style={styles.item}>
            <Image style={styles.img} source={{ uri: episode.img }} />
            <View style={styles.details}>
              <Text style={styles.detailsHead}>{podcast.name}</Text>
              <Text>{episode.title}</Text>
              <Text>{episode.guests.join(", ")}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
