import PlayStore from "./PlayStore";
import {
  onPlayStart,
  onPlayEnd,
  onSetVolume,
  onSetPosition,
  onPlayStop,
  onPlayPause,
  onPlayStatus
} from "./PlayActions";
import {info} from "./PodcastInfoService";

import Expo from "expo";

const { Audio } = Expo;

const playbackInstance = null;

export async function play(id) {
  if (playbackInstance != null) {
    console.log(PlayStore.getId());
    if (PlayStore.getId() === id) {
      await playbackInstance.playAsync();
      return;
    } else {
      await playbackInstance.stopAsync();
      playbackInstance = null;
    }
  }

  const {url} = await info(id);

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
  });

  const initialStatus = {
    shouldPlay: true,
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 1.0,//PlayStore.getVolume(),
    isMuted: false,
    isLooping: false
  };

  const { status, sound } = await Audio.Sound.create(
    { uri: url },
    initialStatus,
    onPlaybackStatusUpdate
  );

  playbackInstance = sound;

  onPlayStart(id, status.durationMillis);
}

function onPlaybackStatusUpdate(status) {
  if (status.didJustFinish) {
    playbackInstance = null;
    onPlayEnd();
  }

  const {volume, positionMillis, durationMillis} = status;

  console.log(status);

  onSetVolume(volume);
  onSetPosition(positionMillis / durationMillis);

}

export async function pause() {
  if (playbackInstance != null) {
    await playbackInstance.pauseAsync();
    onPlayPause();
  }
}

export async function stop() {
  if (playbackInstance != null) {
    await playbackInstance.stopAsync();
    playbackInstance = null;
    onPlayStop();
  }
}

export async function setVolume(volume) {
  if (playbackInstance != null) {
    await playbackInstance.setVolumeAsync(volume);
  }
  onSetVolume(volume);
}

export async function setPosition(position) {
  if (playbackInstance != null) {
    const positionMillis = position * PlayStore.getDurationMillis();
    console.log("set pos", positionMillis);
    await playbackInstance.setStatusAsync({
      positionMillis,
      shouldPlay: true
    });
  }
  onSetPosition(position);
}
