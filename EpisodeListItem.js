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
import {info} from "./EpisodeInfoService";

const styles = StyleSheet.create({
  episode: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    height: 80
  },
  avatar: {
    padding: 5
  },
  details: {
    marginLeft: 5
  },
  detailsHead: {
    fontWeight: "bold",
  }
});

export default class EpisodeListItem extends Component {

  state = {};

  async componentDidMount() {
    const {id} = this.props;
    const episode = await info(id);
    const show = await PodcastInfoService.info(episode.show);
    this.setState({episode,show});
  }

  render() {
    const {onPress} = this.props;

    if (!this.state.episode) {
      return (<View><Text>Loading...</Text></View>);
    }
    const {episode, show} = this.state;


    return (
      <TouchableHighlight onPress={() => onPress(episode)}>
        <View style={styles.episode}>
          <Image
            style={styles.avatar}
            source={{ uri: episode.img }}
            style={{ width: 60, height: 60 }}
          />
          <View style={styles.details}>
            <Text style={styles.detailsHead}>{show.name}</Text>
            <Text>{episode.title}</Text>
            <Text>{episode.guests.join(", ")}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
