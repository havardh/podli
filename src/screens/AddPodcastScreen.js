import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import * as PodcastActions from "../actions/PodcastActions";
import styles from "../styles/Screen";

export default class AddPodcastScreen extends Component {
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
