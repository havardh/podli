import { fetchPodcastInfo } from "./PodcastXMLFeedAdapter";

export async function info(podcastId) {
  return fetchPodcastInfo(podcastId);
}
