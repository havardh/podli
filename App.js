import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";

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
    Home: { screen: HomeStack },
    List: { screen: ListStack }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);

export default App;
