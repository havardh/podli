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

function extractEpisodes(document) {
  return document.rss.channel[0].item;
}

function transformEpisode({ podcastId, img }) {
  return episode => {
    return {
      episodeId: get(episode, "guid[0]._"),
      title: get(episode, "title[0]"),
      podcastId,
      url: get(episode, "media:content[0].$.url"),
      guests: [],
      img: get(episode, "itunes:image[0].$.href", img)
    };
  };
}

export async function fetchShowInfo(feed) {
  await fetch(feed)
    .then(response => response.text())
    .then(parseXmlString)
    .catch(err => console.log("fetch", err));
}

const episodeCache = {};

export async function fetchEpisodeList({ podcastId, feed, img }) {
  if (episodeCache[podcastId]) {
    return episodeCache[podcastId];
  }

  const episodes = await fetch(feed)
    .then(response => response.text())
    .then(parseXmlString)
    .then(extractEpisodes)
    .then(episodes => episodes.map(transformEpisode({ podcastId, img })))
    .catch(err => console.log("fetch", err));

  episodeCache[podcastId] = episodes;

  return episodes;
}
