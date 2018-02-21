import React, { Component } from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";

import PodcastStore from "../stores/PodcastStore";
import PodcastListItem from "../components/PodcastListItem";
import styles from "../styles/Screen";

export default class PodcastScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Podcasts",
    headerRight: (
      <View style={{ marginRight: 10 }}>
        <Button
          onPress={() => navigation.navigate("AddPodcast")}
          title="Add"
          color="#ccc"
        />
      </View>
    )
  });
  state = {
    podcasts: PodcastStore.getState()
  };

  onOpenShow = ({ podcastId }) => {
    const { navigate } = this.props.navigation;
    navigate("Episode", { podcastId });
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
            <PodcastListItem {...item} onPress={this.onOpenShow} />
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
