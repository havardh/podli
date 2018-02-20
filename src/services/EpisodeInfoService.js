import { fetchEpisodeList } from "../adapters//PodcastXMLFeedAdapter";
import * as PodcastInfoService from "./PodcastInfoService";

export async function list(podcastId) {
  const podcast = await PodcastInfoService.info(podcastId);

  const episodes = await fetchEpisodeList(podcast);

  return episodes.map(({ episodeId }) => episodeId);
}

export async function info(podcastId, episodeId) {
  const podcast = await PodcastInfoService.info(podcastId);

  const episodes = await fetchEpisodeList(podcast);

  return episodes.find(episode => episode.episodeId === episodeId);
}
