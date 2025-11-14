interface Query {
  [key: string]: {
    query: string;
    body?: string;
    headers?: {
      [key: string]: string;
    };
  };
}

export const query: Query = {
  leetcode: {
    query: "https://leetcode.com/graphql/",
    body: `
    query {
      upcomingContests {
        title
        titleSlug
        startTime
        duration
      }
    }`,
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0",
    }
  },
  atcoder:{
    query: "https://atcoder.jp/contests/"
  },
  codeforces: {
    query: "https://codeforces.com/api/contest.list",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      Accept: "application/json"
    }
  }
};
