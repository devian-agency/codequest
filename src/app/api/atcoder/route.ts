import { query } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { load } from "cheerio";

export async function GET(req: NextRequest) {
  try {
    const data = await axios.get(query.atcoder.query);

    const html = data.data;
    const $ = load(html);

    const contests: Array<Record<string, any>> = [];

    $("#contest-table-upcoming tbody tr").each((_, el) => {
      const tds = $(el).find("td");

      const titleRaw = $(tds[1]).text().trim();
      const link = "https://atcoder.jp" + $(tds[1]).find("a").attr("href");

      const startTime = new Date($(tds[0]).text().trim()).getTime();

      const durationRaw = $(tds[2]).text().trim();
      const [hours, minutes] = durationRaw.split(":").map(Number);
      const duration = (hours * 60 + minutes) * 60;

      const title = titleRaw
        .replace(/[\u2460-\u24FF\u25A0-\u25FF\u2600-\u27BF]/g, "")
        .trim();
      contests.push({
        name: title,
        url: link,
        platform: "atcoder",
        startTime: new Date(startTime).toISOString(),
        duration,
        endTime: new Date(startTime + duration * 1000).toISOString(),
      });
    });

    return NextResponse.json({contests});
  } catch (e) {
    console.log(e);
    NextResponse.error();
  }
}
