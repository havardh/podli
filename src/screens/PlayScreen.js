import React, { Component } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import Slider from "react-native-slider";

import * as EpisodeActions from "../actions/EpisodeActions";
import * as EpisodeInfoService from "../services/EpisodeInfoService";
import * as PodcastInfoService from "../services/PodcastInfoService";
import * as PlayService from "../services/PlayLocalService";
import PlayStore from "../stores/PlayStore";
import EpisodeDetail from "../components/EpisodeDetail";
import PlaybackControls from "../components/PlaybackControls";
import PlaybackProgress from "../components/PlaybackProgress";
import Button from "../components/Button";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    marginBottom: 0,
    backgroundColor: "#fff"
  },
  slider: {}
});

export default class PlayScreen extends Component {
  static navigationOptions = {
    title: "Play"
  };

  constructor(props) {
    super(props);
    this.state = {
      playState: PlayStore.getState()
    };
  }

  getEpisodeId() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.episodeId
    ) {
      return this.props.navigation.state.params.episodeId;
    } else {
      return PlayStore.getEpisodeId();
    }
  }

  getPodcastId() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.podcastId
    ) {
      return this.props.navigation.state.params.podcastId;
    } else {
      return PlayStore.getPodcastId();
    }
  }

  async componentDidMount() {
    const podcastId = this.getPodcastId();
    const episodeId = this.getEpisodeId();
    const podcast = await PodcastInfoService.info(podcastId);
    const episode = await EpisodeInfoService.info(podcastId, episodeId);
    this.setState({ episodeId, episode, podcast });

    PlayStore.addListener(this.onStateChange);
  }

  componentWillUnmount() {
    PlayStore.removeListener(this.onStateChange);
  }

  onStateChange = () => {
    this.setState(prevState => {
      if (prevState.episodeId === PlayStore.getEpisodeId()) {
        return { playState: PlayStore.getState() };
      } else {
        return {
          playState: {}
        };
      }
    });
  };

  play = async () => {
    const { episodeId, podcastId } = this.state.episode;
    await PlayService.play(podcastId, episodeId);
  };

  pause = async () => {
    await PlayService.pause();
  };

  stop = async () => {
    await PlayService.stop();
  };

  setVolume = async volume => {
    await PlayService.setVolume(volume);
  };

  setPosition = async position => {
    await PlayService.setPosition(position);
  };

  removeEpisode = () => {
    const { podcastId, episodeId } = this.state.episode;
    EpisodeActions.onRemoveEpisode(podcastId, episodeId);
    const { goBack } = this.props.navigation;
    goBack();
  };

  render() {
    if (!this.state.episode) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    const { episode, podcast, playState } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <EpisodeDetail episode={episode} podcast={podcast} />

          <Button title="Remove" onPress={this.removeEpisode} />
        </View>

        <View style={styles.container}>
          <PlaybackProgress {...playState} />

          <Slider
            value={playState.position}
            onValueChange={this.setPosition}
            minimumTrackTintColor={"#ccc"}
            thumbTintColor={"#ccc"}
          />

          <PlaybackControls
            onPlay={this.play}
            onPause={this.pause}
            onStop={this.stop}
          />

          <Slider
            value={playState.volume}
            onValueChange={this.setVolume}
            minimumTrackTintColor={"#ccc"}
            thumbTintColor={"#ccc"}
          />
        </View>
      </View>
    );
  }
}
