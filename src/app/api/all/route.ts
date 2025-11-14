import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { shuffle } from "@/components/shuffle";

const url = "https://codequest.devian.in";

export async function GET(req: NextRequest) {
  try{
    const [leetcode, atcoder, codeforces] = await Promise.all([
      axios.get(url + "/api/leetcode"),
      axios.get(url + "/api/atcoder"),
      axios.get(url + "/api/codeforces"),

    ])
    return NextResponse.json({
      contests: shuffle([
        ...codeforces.data.contests,
        ...atcoder.data.contests,
        ...leetcode.data.contests,
      ]),
    });
  }
  catch(e){
    console.log(e);
    NextResponse.error();
  }
}