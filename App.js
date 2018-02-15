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

import { nextUp } from "./EpisodeListService";

const Episode = ({ navigate, ...episode }) => (
  <TouchableHighlight onPress={() => navigate("Play", { id: episode.id })}>
    <View style={styles.episode}>
      <Image
        style={styles.avatar}
        source={{ uri: episode.img }}
        style={{ width: 60, height: 60 }}
      />
      <View style={styles.details}>
        <Text>{episode.show}</Text>
        <Text>{episode.title}</Text>
        <Text>{episode.guests.join(", ")}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

class HomeScreen extends Component {
  state = {};

  componentDidMount() {
    nextUp().then(episodes => {
      this.setState({ episodes });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.episodes}
          renderItem={({ item }) => <Episode {...item} navigate={navigate} />}
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
  episode: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    height: 80
  },
  avatar: {
    padding: 5
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menubutton: {
    height: 40,
    width: 60
  }
});

class PickScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="To home" onPress={() => navigate("Home")} />
      </View>
    );
  }
}

class ListScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="To home" onPress={() => navigate("Home")} />
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
