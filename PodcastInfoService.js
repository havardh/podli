const podcasts = [
  {
    podcastId: "changelog",
    name: "The Changelog",
    img:
      "https://cdn.changelog.com/images/podcasts/podcast-cover-art-64a3184278271e1751c20f040e3c0055.png?vsn=d",
    feed: "http://feeds.feedburner.com/changelogshow"
  },
  {
    podcastId: "tal",
    name: "This American Life",
    img:
      "http://www.thisamericanlife.org/sites/all/themes/thislife/images/logo-square-1400.jpg",
    feed: "http://feed.thisamericanlife.org/talpodcast?format=xml"
  }
];

export async function search(title) {
  return await podcasts;
}

export async function info(podcastId) {
  return await podcasts.find(podcast => podcast.podcastId === podcastId);
}
