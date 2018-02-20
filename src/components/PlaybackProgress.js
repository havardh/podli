import React from "react";
import { Text, View } from "react-native";

import MinuteSeconds from "./MinuteSeconds";

const PlaybackProgress = ({ position, durationMillis }) => (
  <View>
    <Text>
      <MinuteSeconds millis={position * durationMillis} />
      /
      <MinuteSeconds millis={durationMillis} />
    </Text>
  </View>
);

export default PlaybackProgress;
