import { parseString } from "react-native-xml2js";
import { get } from "lodash";
import Cache from "./LocalCacheAdapter";

async function parseXmlString(xml) {
  return await new Promise((resolve, reject) =>
    parseString(xml, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  );
}

const feedCache = new Cache("feed");

async function fetchFeed(feed) {
  return await feedCache.get(
    feed,
    async feed =>
      await fetch(feed)
        .then(response => response.text())
        .then(parseXmlString)
  );
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

const podcastCache = new Cache("podcast");

function transformPodcast(feed) {
  return info => ({
    podcastId: feed,
    name: info.title[0],
    img: get(info, "itunes:image[0].$.href"),
    feed
  });
}

export async function fetchPodcastInfo(feed) {
  return await podcastCache.get(
    feed,
    async feed =>
      await fetchFeed(feed)
        .then(extractPodcastInfo)
        .then(transformPodcast(feed))
        .catch(err => console.log("fetch", err))
  );
}

const episodeCache = new Cache("episode");

export async function fetchEpisodeList({ podcastId, feed, img }) {
  return episodeCache.get(
    feed,
    async feed =>
      await fetchFeed(feed)
        .then(extractEpisodes)
        .then(episodes => episodes.map(transformEpisode({ podcastId, img })))
        .catch(err => console.log("fetch", err))
  );
}
