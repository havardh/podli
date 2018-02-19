import { parseString } from "react-native-xml2js";
import { get } from "lodash";

async function parseXmlString(xml) {
  return await new Promise((resolve, reject) =>
    parseString(xml, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  );
}

const feedCache = {};

async function fetchFeed(feed) {
  if (feedCache[feed]) {
    return feedCache[feed];
  }

  const document = await fetch(feed)
    .then(response => response.text())
    .then(parseXmlString);

  feedCache[feed] = document;

  return document;
}

function extractPodcastInfo(document) {
  return document.rss.channel[0];
}

function extractEpisodes(document) {
  return document.rss.channel[0].item;
}

function transformEpisode({ podcastId, img }) {
  return episode => {
    return {
      episodeId: get(episode, "guid[0]._"),
      title: get(episode, "title[0]"),
      podcastId,
      url: get(
        episode,
        "media:content[0].$.url",
        get(episode, "enclosure[0].$.url")
      ),
      guests: [],
      img: get(episode, "itunes:image[0].$.href", img)
    };
  };
}

const podcastCache = {};

function transformPodcast(feed) {
  return info => ({
    podcastId: feed,
    name: info.title[0],
    img: get(info, "itunes:image[0].$.href"),
    feed
  });
}

export async function fetchPodcastInfo(feed) {
  if (podcastCache[feed]) {
    return podcastCache[feed];
  }

  const podcast = await fetchFeed(feed)
    .then(extractPodcastInfo)
    .then(transformPodcast(feed))
    .catch(err => console.log("fetch", err));

  podcastCache[feed] = podcast;

  return podcast;
}

const episodeCache = {};

export async function fetchEpisodeList({ podcastId, feed, img }) {
  if (episodeCache[podcastId]) {
    return episodeCache[podcastId];
  }

  const episodes = await fetchFeed(feed)
    .then(extractEpisodes)
    .then(episodes => episodes.map(transformEpisode({ podcastId, img })))
    .catch(err => console.log("fetch", err));

  episodeCache[podcastId] = episodes;

  return episodes;
}
