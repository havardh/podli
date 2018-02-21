import React from "react";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

import AddPodcastScreen from "./src/screens/AddPodcastScreen";
import EpisodeScreen from "./src/screens/EpisodeScreen";
import PlayScreen from "./src/screens/PlayScreen";
import PodcastScreen from "./src/screens/PodcastScreen";
import UpNextScreen from "./src/screens/UpNextScreen";

const HomeStack = StackNavigator({
  UpNext: { screen: UpNextScreen },
  Play: { screen: PlayScreen }
});

const ListStack = StackNavigator({
  Podcast: { screen: PodcastScreen },
  Episode: { screen: EpisodeScreen },
  AddPodcast: { screen: AddPodcastScreen }
});

const App = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: () => <FontAwesome name="list" size={28} color="#ccc" />
      })
    },
    List: {
      screen: ListStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: () => <FontAwesome name="podcast" size={28} color="#ccc" />
      })
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOption: {
      showIcon: true
    }
  }
);

export default App;
