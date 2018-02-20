import React from "react";
import { Text } from "react-native";

const MinuteSeconds = ({ millis }) => (
  <Text>
    {(millis / 1000 / 60) | 0}:{((millis / 1000) % 60) | 0}
  </Text>
);

export default MinuteSeconds;
