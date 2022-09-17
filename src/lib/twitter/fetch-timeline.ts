import sanitizeHtml from "sanitize-html";
import twitter from "twitter-text";

const fetcher = async (url: string) => {
  const headers = {
    Authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
  };
  const res = await fetch(url, { headers });
  const data = await res.json();
  return data;
};

const fetchUserByUsername = async (username: string) => {
  const params = {
    "user.fields": "profile_image_url",
  };
  const query = new URLSearchParams(params);
  const url = `https://api.twitter.com/2/users/by/username/${username}?${query}`;
  const res = await fetcher(url);
  return {
    data: res.data as User,
  };
};

const fetchTweetsByUserId = async (userId: string, limit: number = 10) => {
  const params = {
    exclude: "retweets,replies",
    "tweet.fields": "created_at,entities,attachments",
    "media.fields": "url,preview_image_url,media_key,width,height",
    expansions: "author_id,attachments.media_keys",
    max_results: limit.toString(),
  };
  const query = new URLSearchParams(params);
  const url = `https://api.twitter.com/2/users/${userId}/tweets?${query}`;
  const res = await fetcher(url);
  return {
    data: res.data as Tweet[],
    includes: res.includes as Includes,
  };
};

export const fetchTimelineByUsername = async (
  username: string
): Promise<Timeline> => {
  const { data: user } = await fetchUserByUsername(username);
  const { data: tweets, includes } = await fetchTweetsByUserId(user.id);

  return tweets.map((tweet) => ({
    id: tweet.id,
    name: user.name,
    username: user.username,
    profile_image_url: user.profile_image_url,
    created_at: tweet.created_at,
    text: tweet.text,
    html: tweetTextToHtml(tweet, includes),
  }));
};

const tweetTextToHtml = (tweet: Tweet, includes: Includes) => {
  const includesMedia: Media[] = includes?.media ?? [];
  const mediaUrls = tweet?.entities?.urls?.filter((value) => {
    return "media_key" in value;
  });

  let text = tweet.text;

  mediaUrls?.forEach((value) => {
    text = text.replace(value.url, "");
  });

  text = sanitizeHtml(text);
  // text = twitter.htmlEscape(text);

  text = twitter.autoLink(text, {
    usernameIncludeSymbol: true,
    targetBlank: true,
    urlEntities:
      tweet?.entities?.urls?.map((url) => ({
        url: url.url,
        display_url: url.display_url,
        expanded_url: url.expanded_url,
        indices: [url.start, url.end],
      })) ?? [],
  });

  if (mediaUrls) {
    const colSpan = mediaUrls.length < 4 ? mediaUrls.length : 2;
    text += `<div style="display: grid; grid-template-columns: repeat(${colSpan}, 1fr); gap: 1px; margin-top: 4px;">`;
    mediaUrls.forEach((value) => {
      const media = includesMedia.find(
        (media) => media.media_key === value.media_key
      );
      if (!media) {
        return;
      }
      const anchorOpen = `<a href="${value.expanded_url}" target="_blank" rel="noopener noreferrer">`;
      const anchorClose = "</a>";
      const img = `<img src="${media.url}" alt="" style="margin: 0;" /></a>`;
      text += `${anchorOpen}${img}${anchorClose}`;
    });
    text += `</div>`;
  }

  return text;
};

export type User = {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
};

export type Tweet = {
  id: string;
  text: string;
  created_at: string;
  entities?: Entities;
  attachments?: Attachments;
};

export type Timeline = (Pick<User, "name" | "username" | "profile_image_url"> &
  Pick<Tweet, "id" | "text" | "created_at"> & { html: string })[];

export type EntityType = "url" | "mention" | "hashtag";

export type Entity = {
  start: number;
  end: number;
};
export type Mention = Entity & {
  username?: string;
  id?: string;
};

export type Hashtag = Entity & {
  tag?: string;
};

export type Url = Entity & {
  url: string;
  display_url: string;
  expanded_url: string;
  images?: {
    url: string;
    width: number;
    height: number;
  }[];
  status?: number;
  title?: string;
  description?: string;
  unwound_url?: string;
  media_key?: string;
};

export type Entities = {
  urls?: Url[];
  mentions?: Mention[];
  hashtags?: Hashtag[];
};

export type Attachments = {
  media_keys?: string[];
};

export type Media = {
  media_key: string;
  url: string;
  type: string;
  width: number;
  height: number;
};

export type Includes = {
  media?: Media[];
};
