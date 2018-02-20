import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { get } from "lodash";

import EpisodeStore from "../stores/EpisodeStore";
import EpisodeListItem from "../components/EpisodeListItem";
import styles from "../styles/Screen";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Up Next"
  };

  state = { episodes: EpisodeStore.getState() };

  async componentDidMount() {
    EpisodeStore.addListener(this.onStateChange);
  }

  componentWillUnmount() {
    EpisodeStore.removeListener(this.onStateChange);
  }

  onStateChange = () => {
    this.setState({ episodes: EpisodeStore.getState() });
  };

  onOpenPlayEpisode = ({ episodeId, podcastId }) => {
    const { navigate } = this.props.navigation;
    navigate("Play", { episodeId, podcastId });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.episodes.map(({ episodeId, podcastId }) => ({
            episodeId,
            podcastId,
            key: episodeId
          }))}
          renderItem={({ item }) => (
            <EpisodeListItem {...item} onPress={this.onOpenPlayEpisode} />
          )}
        />
        {this.state.episodes.length === 0 && (
          <View>
            <Text>
              Your episode list is empty. Go to the Podcast tab to add new ones.
            </Text>

            <Text>
              podli puts the episodes front and center. This screen contains a
              list of the episodes you have added. podli will play these
              episodes in the order they appear as a playlist.
            </Text>
          </View>
        )}
      </View>
    );
  }
}
