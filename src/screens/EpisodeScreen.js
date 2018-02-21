import React, { Component } from "react";
import { Button, Text, View, FlatList } from "react-native";

import * as EpisodeActions from "../actions/EpisodeActions";
import * as PodcastActions from "../actions/PodcastActions";
import * as EpisodeInfoService from "../services/EpisodeInfoService";
import * as PodcastInfoService from "../services/PodcastInfoService";
import EpisodeListItem from "../components/EpisodeListItem";
import PodcastDetail from "../components/PodcastDetail";
import Loading from "../components/Loading";
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

    if (!podcast && !episodes) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <PodcastDetail
              podcast={podcast}
              onRemovePodcast={this.onRemovePodcast}
            />
          }
          data={episodes}
          renderItem={({ item }) => (
            <EpisodeListItem {...item} onPress={this.onAddEpisode} />
          )}
        />
      </View>
    );
  }
}
