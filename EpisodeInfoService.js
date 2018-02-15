const episodes = [
  {
    key: "changelog-281",
    id: "changelog-281",
    show: "changelog",
    img:
      "https://secure.gravatar.com/avatar/be40e562127ed41b570246f15cb25abf.jpg?s=150&d=mm",
    url: "https://cdn.changelog.com/uploads/podcast/282/the-changelog-282.mp3",
    title: "The Impact and Future of Kubernetes",
    guests: ["Brendan Burns", "Gabe Monroy"],
    topics: ["kubernetes", "cloud", "ops"]
  },
  {
    key: "changelog-280",
    id: "changelog-280",
    show: "changelog",
    img:
      "https://cdn.changelog.com/uploads/avatars/people/YXNk/avatar_small.png?v=63676699810",
    url: "https://cdn.changelog.com/uploads/podcast/280/the-changelog-280.mp3",
    title: "Building a Secure Operating System with Rust",
    guests: ["Jeremy Soller"],
    topics: ["rust", "operating-system"]
  },
  {
    key: "tal-638",
    id: "tal-638",
    show: "tal",
    img:
      "https://cdn.changelog.com/uploads/avatars/people/YXNk/avatar_small.png?v=63676699810",
    url: "https://www.podtrac.com/pts/redirect.mp3/podcast.thisamericanlife.org/podcast/638.mp3",
    title: "Rom-Com",
    guests: ["Jeremy Soller"],
    topics: ["rust", "operating-system"]
  }
];

export async function list(episodeId) {

  
  return await episodes.filter(({show}) => show === episodeId).map(({id}) => id);
}

export async function info(episodeId) {
  return await episodes.find(({ id }) => id === episodeId);
}
