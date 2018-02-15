import { info } from "./PodcastInfoService";

const episodes = ["changelog-281", "changelog-280", "tal-638"];

export async function nextUp() {
  return await Promise.all(episodes.map(async key => await info(key)));
}
