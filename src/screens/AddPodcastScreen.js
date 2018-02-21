import React, { Component } from "react";
import {
  Clipboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";

import Button from "../components/Button";
import * as PodcastActions from "../actions/PodcastActions";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#fff"
  },

  label: {
    fontWeight: "bold"
  },

  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 10
  },

  button: {
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 10,
    margin: 5
  }
});

export default class AddPodcastScreen extends Component {
  static navigationOptions = {
    title: "Add Podcast"
  };
  state = { text: "" };

  onAdd = async () => {
    await PodcastActions.onAddPodcast(this.state.text);
    this.props.navigation.goBack();
  };

  onCopyFromClipboard = async () => {
    const text = await Clipboard.getString();
    this.setState({ text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Feed url:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button title={"From Clipboard"} onPress={this.onCopyFromClipboard} />
        <Button title={"Add"} onPress={this.onAdd} />
      </View>
    );
  }
}
