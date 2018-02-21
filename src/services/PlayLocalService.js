import PlayStore from "../stores/PlayStore";
import {
  onPlayStart,
  onPlayEnd,
  onSetVolume,
  onSetPosition,
  onPlayStop,
  onPlayPause,
  onPlayStatus
} from "../actions/PlayActions";
import * as EpisodeInfoService from "./EpisodeInfoService";
import ProgressStore from "../stores/ProgressStore";

import Expo from "expo";

const { Audio } = Expo;

const playbackInstance = null;

export async function play(podcastId, episodeId) {
  if (playbackInstance != null) {
    if (PlayStore.getEpisodeId() === episodeId) {
      await playbackInstance.playAsync();
      return;
    } else {
      await playbackInstance.stopAsync();
      playbackInstance = null;
    }
  }

  const { url } = await EpisodeInfoService.info(podcastId, episodeId);

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
    volume: PlayStore.getVolume(),
    positionMillis: ProgressStore.getPositionMillis({ podcastId, episodeId }),
    isMuted: false,
    isLooping: false
  };

  const { status, sound } = await Audio.Sound.create(
    { uri: url },
    initialStatus,
    onPlaybackStatusUpdate
  );

  playbackInstance = sound;

  onPlayStart(podcastId, episodeId, status.durationMillis);
}

function onPlaybackStatusUpdate(status) {
  if (status.didJustFinish) {
    playbackInstance = null;
    onPlayEnd();
  }

  const { volume, positionMillis, durationMillis } = status;

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
    await playbackInstance.setStatusAsync({
      positionMillis,
      shouldPlay: true
    });
  }
  onSetPosition(position);
}
