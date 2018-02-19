import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  Button,
  Image,
  TouchableHighlight
} from "react-native";
import { get } from "lodash";

import { Font } from "expo";

import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";

import PlayScreen from "./Play";

import EpisodeStore from "./EpisodeStore";
import PodcastStore from "./PodcastStore";
import * as EpisodeActions from "./EpisodeActions";
import * as EpisodeInfoService from "./EpisodeInfoService";
import * as PodcastInfoService from "./PodcastInfoService";
import { list } from "./PodcastListService";
import * as PodcastActions from "./PodcastActions";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
});

class PickScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Podcasts",
    headerRight: (
      <Button
        style={{ paddingLeft: 10 }}
        onPress={() => navigation.navigate("Add")}
        title="Add"
        color="#ccc"
      />
    )
  });
  state = {
    podcasts: PodcastStore.getState()
  };

  onOpenShow = ({ podcastId }) => {
    const { navigate } = this.props.navigation;
    navigate("List", { podcastId });
  };

  async componentDidMount() {
    PodcastStore.addListener(this.onStateChange);
  }

  componentWillUnmount() {
    PodcastStore.removeListener(this.onStateChange);
  }

  onStateChange = () => {
    this.setState({
      podcasts: PodcastStore.getState()
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.podcasts.map(({ podcastId }) => ({
            podcastId,
            key: podcastId
          }))}
          renderItem={({ item }) => (
            <ShowListItem {...item} onPress={this.onOpenShow} />
          )}
        />
        {this.state.podcasts.length === 0 && (
          <View>
            <Text>
              To get started you need to add some Podcasts. Click the add button
              above.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

class ListScreen extends Component {
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

class AddScreen extends Component {
  static navigationOptions = {
    title: "Add Podcast"
  };
  state = { text: "" };

  onAdd = async () => {
    await PodcastActions.onAddPodcast(this.state.text);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View>
        <Text>Feed url:</Text>
        <TextInput onChangeText={text => this.setState({ text })} />
        <Button title="Add" onPress={this.onAdd} />
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
  List: { screen: ListScreen },
  Add: { screen: AddScreen }
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
