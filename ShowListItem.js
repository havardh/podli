import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight
} from "react-native";

import {info} from "./PodcastInfoService";

const styles = StyleSheet.create({
  episode: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    height: 80
  },
  avatar: {
    padding: 5
  },
});

export default class ShowListItem extends Component {

  state = {};

  async componentDidMount() {
    const {id} = this.props;
    const show = await info(id);
    this.setState({show});
  }

  render() {
    const {onPress} = this.props;

    if (!this.state.show) {
      return (<View><Text>Loading...</Text></View>);
    }
    const {show} = this.state;

    return (
      <TouchableHighlight onPress={() => onPress(show)}>
        <View style={styles.episode}>
          <Image
            style={styles.avatar}
            source={{ uri: show.img }}
            style={{ width: 60, height: 60 }}
          />
          <View style={styles.details}>
            <Text>{show.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
