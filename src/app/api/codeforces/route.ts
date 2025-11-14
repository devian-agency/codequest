import { query } from "@/lib/queries";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await axios.get(query.codeforces.query, {
      headers: query.codeforces.headers,
    });
    
    return NextResponse.json({contests: data.data.result
  .filter((c: any) => c.phase === "BEFORE")
    .map((c: any) => {
      const startMs = c.startTimeSeconds * 1000;
      const endMs = (c.startTimeSeconds + c.durationSeconds) * 1000;
      return {
      name: c.name,
      url: `https://codeforces.com/contest/${c.id}`,
      platform: "codeforces",
      startTime: new Date(startMs).toISOString(),
      duration: c.durationSeconds,
      endTime: (new Date(endMs)).toISOString()
    }})
  });
  } catch (e) {
    console.log(e);
    NextResponse.error();
  }
}