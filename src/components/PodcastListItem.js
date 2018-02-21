import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

import * as PodcastInfoService from "../services/PodcastInfoService";
import styles from "../styles/Item";

export default class PodcastListItem extends Component {
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
        <View style={styles.container}>
          <View style={styles.item}>
            <Image
              style={styles.img}
              source={{ uri: podcast.img }}
              style={{ width: 60, height: 60 }}
            />
            <View style={styles.details}>
              <Text style={styles.detailsHead}>{podcast.name}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
