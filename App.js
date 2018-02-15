import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  TouchableHighlight
} from "react-native";

import { StackNavigator } from "react-navigation";

import PlayScreen from "./Play";

import EpisodeStore from "./EpisodeStore";
import * as EpisodeActions from "./EpisodeActions";
import * as EpisodeInfoService from "./EpisodeInfoService";
import { list } from "./PodcastListService";
import EpisodeListItem from "./EpisodeListItem";
import ShowListItem from "./ShowListItem";

class HomeScreen extends Component {
  state = { episodes: EpisodeStore.getState() };

  componentDidMount() {
    EpisodeStore.addListener(this.onStateChange);
  }

  componentWillUnmount() {
    EpisodeStore.removeListener(this.onStateChange);
  }

  onStateChange = () => {
    this.setState({ episodes: EpisodeStore.getState() });
  };

  onOpenPlayEpisode = ({ id }) => {
    const { navigate } = this.props.navigation;
    navigate("Play", { id });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.episodes.map(id => ({ id, key: id }))}
          renderItem={({ item }) => (
            <EpisodeListItem {...item} onPress={this.onOpenPlayEpisode} />
          )}
        />

        <View style={styles.menu}>
          <Button
            style={styles.menubutton}
            title="Play"
            onPress={() => navigate("Play")}
          />
          <Button
            style={styles.menubutton}
            title="Pick"
            onPress={() => navigate("Pick")}
          />
          <Button
            style={styles.menubutton}
            title="Play"
            onPress={() => navigate("Play")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  menu: {
    flex: 1,
    flexDirection: "row",
  },
});

class PickScreen extends Component {
  state = {};

  onOpenShow = ({ id }) => {
    const { navigate } = this.props.navigation;
    navigate("List", { showId: id });
  };

  async componentDidMount() {
    list()
      .then(shows => shows.map(id => ({ id, key: id })))
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
  state = {};

  componentDidMount() {
    const { showId } = this.props.navigation.state.params;
    EpisodeInfoService.list(showId)
      .then(episodes => episodes.map(id => ({ id, key: id })))
      .then(episodes => {
        this.setState({ episodes });
      });
  }

  onAddEpisode = ({ id }) => {
    EpisodeActions.onAddEpisode(id);
  };

  render() {
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

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Play: { screen: PlayScreen },
  Pick: { screen: PickScreen },
  List: { screen: ListScreen },
  Spec: { screen: SpecScreen }
});

export default App;
