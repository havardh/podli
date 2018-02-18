import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  Image,
  TouchableHighlight
} from "react-native";

import { Font } from "expo";

import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";

import PlayScreen from "./Play";

import EpisodeStore from "./EpisodeStore";
import * as EpisodeActions from "./EpisodeActions";
import * as EpisodeInfoService from "./EpisodeInfoService";
import { list } from "./PodcastListService";
import EpisodeListItem from "./EpisodeListItem";
import ShowListItem from "./ShowListItem";

class HomeScreen extends Component {
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
});

class PickScreen extends Component {
  static navigationOptions = {
    title: "Podcasts"
  };

  state = {};

  onOpenShow = ({ podcastId }) => {
    const { navigate } = this.props.navigation;
    navigate("List", { podcastId });
  };

  async componentDidMount() {
    list()
      .then(shows => shows.map(podcastId => ({ podcastId, key: podcastId })))
      .then(shows => this.setState({ shows }));
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.shows}
          renderItem={({ item }) => (
            <ShowListItem {...item} onPress={this.onOpenShow} />
          )}
        />
      </View>
    );
  }
}

class ListScreen extends Component {
  static navigationOptions = {
    title: "Episodes"
  };
  state = {};

  componentDidMount() {
    const { podcastId } = this.props.navigation.state.params;
    EpisodeInfoService.list(podcastId)
      .then(episodes => {
        return episodes.map(episodeId => ({
          episodeId,
          podcastId,
          key: episodeId
        }));
      })
      .then(episodes => {
        this.setState({ episodes });
      });
  }

  onAddEpisode = ({ episodeId, podcastId }) => {
    EpisodeActions.onAddEpisode(podcastId, episodeId);
  };

  render() {
    const { podcastId } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.episodes}
          renderItem={({ item }) => (
            <EpisodeListItem {...item} onPress={this.onAddEpisode} />
          )}
        />
      </View>
    );
  }
}

class SpecScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="To home" onPress={() => navigate("Home")} />
      </View>
    );
  }
}

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Play: { screen: PlayScreen }
});

const ListStack = StackNavigator({
  Pick: { screen: PickScreen },
  List: { screen: ListScreen }
});

const App = TabNavigator(
  {
    Home: { screen: HomeStack },
    List: { screen: ListStack }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);

export default App;
