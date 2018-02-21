import React from "react";
import { Text } from "react-native";

function formatTwoDigits(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return "" + num;
  }
}

function formatHours(millis) {
  const hours = (millis / (1000 * 60 * 60)) | 0;

  return formatTwoDigits(hours);
}

function formatMinutes(millis) {
  const minutes = ((millis / (1000 * 60)) % 60) | 0;

  return formatTwoDigits(minutes);
}

function formatSeconds(millis) {
  const seconds = ((millis / 1000) % 60) | 0;

  return formatTwoDigits(seconds);
}

const MinuteSeconds = ({ millis }) => (
  <Text>
    {formatHours(millis)}:{formatMinutes(millis)}:{formatSeconds(millis)}
  </Text>
);

export default MinuteSeconds;
