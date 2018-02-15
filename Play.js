import React, { Component } from "react";
import { StyleSheet, Image, Text, View, Button } from "react-native";
import Slider from "react-native-slider";

import { info } from "./EpisodeInfoService";
import * as PodcastInfoService from "./PodcastInfoService";
import * as PlayService from "./PlayLocalService";
import PlayStore from "./PlayStore";

const EpisodeDetail = ({episode, show}) => (
  <View>
    <Image style={styles.avatar} source={{ uri: episode.img }} />
    <View style={styles.details}>
      <Text style={styles.detailsHead}>{show.name}</Text>
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
    fontWeight: "bold",
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
    if (this.props.navigation.state.params && this.props.navigation.state.params.id) {
      return this.props.navigation.state.params.id;
    } else {
      return PlayStore.getId();
    }
  }

  async componentDidMount() {
    const id = this.getEpisodeId();
    const episode = await info(id);
    const show = await PodcastInfoService.info(episode.show);
    this.setState({ id, episode, show });

    PlayStore.addListener(this.onStateChange);
  }

  componentWillUnmount() {
    PlayStore.removeListener(this.onStateChange);
  }

  onStateChange = () => {
    this.setState(prevState => {
      if (prevState.id === PlayStore.getId()) {
        return { playState: PlayStore.getState() };
      } else {
        return {
          playState: {}
        };
      }
    });
  };

  play = async () => {
    await PlayService.play(this.state.episode.id);
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

    const { episode, show, playState } = this.state;
    return (
      <View>
        {episode && <EpisodeDetail episode={episode} show={show} />}

        <PlaybackStatus {...playState} />

        <Slider
          value={playState.position}
          onValueChange={this.setPosition}
        />

        <Slider
          value={playState.volume}
          onValueChange={this.setVolume}
        />

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
