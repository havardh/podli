import React, { Component } from "react";
import { Button, Text, View, FlatList } from "react-native";
import { get } from "lodash";

import * as EpisodeActions from "../actions/EpisodeActions";
import * as PodcastActions from "../actions/PodcastActions";
import * as EpisodeInfoService from "../services/EpisodeInfoService";
import * as PodcastInfoService from "../services/PodcastInfoService";
import EpisodeListItem from "../components/EpisodeListItem";
import styles from "../styles/Screen";

export default class EpisodeScreen extends Component {
  static navigationOptions = {
    title: "Episodes"
  };
  state = {};

  async componentDidMount() {
    const { podcastId } = this.props.navigation.state.params;
    const podcast = await PodcastInfoService.info(podcastId);
    const episodes = await EpisodeInfoService.list(podcastId);
    this.setState({
      podcast,
      episodes: episodes.map(episodeId => ({
        episodeId,
        podcastId,
        key: episodeId
      }))
    });
  }

  onAddEpisode = ({ episodeId, podcastId }) => {
    EpisodeActions.onAddEpisode(podcastId, episodeId);
  };

  onRemovePodcast = () => {
    const { podcastId } = this.props.navigation.state.params;
    PodcastActions.onRemovePodcast(podcastId);
  };

  render() {
    const { podcastId } = this.props.navigation.state.params;
    const { podcast, episodes } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text>{get(podcast, "name")}</Text>
          <Button title="Remove" onPress={this.onRemovePodcast} />
        </View>
        <FlatList
          data={episodes}
          renderItem={({ item }) => (
            <EpisodeListItem {...item} onPress={this.onAddEpisode} />
          )}
        />
      </View>
    );
  }
}
