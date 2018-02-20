import { fetchPodcastInfo } from "../adapters/PodcastXMLFeedAdapter";

export async function info(podcastId) {
  return fetchPodcastInfo(podcastId);
}
