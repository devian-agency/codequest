import { query } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const data = await axios.post(
      query.leetcode.query,
      { query: query.leetcode.body },
      { headers: query.leetcode.headers }
    );

    return NextResponse.json({
      contests: data.data.data.upcomingContests?.map((contest: any) => {
        const startMs = contest.startTime * 1000;
        const endMs = (contest.startTime + contest.duration) * 1000;

        return {
          name: contest.title,
          platform: "Leetcode",
          startTime: new Date(startMs).toISOString(),
          duration: contest.duration,
          url: `https://leetcode.com/contest/${contest.titleSlug}`,
          endTime: new Date(
            endMs
          ).toISOString(),
        };
      }),
    });
  } catch (e) {
    console.log(e);
    NextResponse.error();
  }
}
