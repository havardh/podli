import { dispatch } from "./Dispatcher";
import { info } from "./PodcastInfoService";

export const ADD = "PODCAST#ADD";
export const REMOVE = "PODCAST#REMOVE";

export async function onAddPodcast(feed) {
  const { podcastId } = await info(feed);
  dispatch({ type: ADD, data: { podcastId } });
}

export function onRemovePodcast(podcastId) {
  dispatch({ type: REMOVE, data: { podcastId } });
}
