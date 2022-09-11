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
  return res.data as User;
};

const fetchTweetsByUserId = async (userId: string) => {
  const params = {
    "tweet.fields": "created_at",
    max_results: "5",
  };
  const query = new URLSearchParams(params);
  const url = `https://api.twitter.com/2/users/${userId}/tweets?${query}`;
  const res = await fetcher(url);
  return res.data as Tweet[];
};

export const fetchTimelineByUsername = async (
  username: string
): Promise<Timeline> => {
  const user = await fetchUserByUsername(username);
  const tweets = await fetchTweetsByUserId(user.id);

  return tweets.map((tweet) => ({
    name: user.name,
    username: user.username,
    profile_image_url: user.profile_image_url,
    created_at: tweet.created_at,
    text: tweet.text,
  }));
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
};

export type Timeline = (Pick<User, "name" | "username" | "profile_image_url"> &
  Pick<Tweet, "text" | "created_at">)[];
