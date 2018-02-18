import React, { Component } from "react";
import { StyleSheet, Image, Text, View, Button } from "react-native";
import Slider from "react-native-slider";

import * as EpisodeInfoService from "./EpisodeInfoService";
import * as PodcastInfoService from "./PodcastInfoService";
import * as PlayService from "./PlayLocalService";
import PlayStore from "./PlayStore";

const EpisodeDetail = ({ episode, podcast }) => (
  <View>
    <Image style={styles.avatar} source={{ uri: episode.img }} />
    <View style={styles.details}>
      <Text style={styles.detailsHead}>{podcast.name}</Text>
      <Text>{episode.title}</Text>
      <Text>{episode.guests.join(", ")}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200
  },
  details: {},
  detailsHead: {
    fontWeight: "bold"
  }
});

const PlayButtons = ({ onPlay, onPause, onStop }) => (
  <View>
    <Button style={pbStyles.button} title="▶️" onPress={onPlay} />
    <Button style={pbStyles.button} title="⏸️" onPress={onPause} />
    <Button style={pbStyles.button} title="⏹️" onPress={onStop} />
  </View>
);

const pbStyles = StyleSheet.create({
  button: {
    padding: 20,
    height: 20,
    width: 20
  }
});

const MinuteSeconds = ({ millis }) => (
  <Text>
    {(millis / 1000 / 60) | 0}:{((millis / 1000) % 60) | 0}
  </Text>
);

const PlaybackStatus = ({ position, durationMillis }) => (
  <View>
    <Text>
      <MinuteSeconds millis={position * durationMillis} />
      /
      <MinuteSeconds millis={durationMillis} />
    </Text>
  </View>
);

class PlayScreen extends Component {
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
        {episode && <EpisodeDetail episode={episode} podcast={podcast} />}

        <PlaybackStatus {...playState} />

        <Slider value={playState.position} onValueChange={this.setPosition} />

        <Slider value={playState.volume} onValueChange={this.setVolume} />

        <PlayButtons
          onPlay={this.play}
          onPause={this.pause}
          onStop={this.stop}
        />
      </View>
    );
  }
}

export default PlayScreen;
