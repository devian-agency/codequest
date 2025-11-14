"use client";
import Card, { CardProps } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const [contests, setContests] = useState<CardProps[]>([]);
  const [filteredContests, setFilteredContests] = useState<CardProps[]>([]);
  const searchParams = useSearchParams();

  const getContests = async (platform: string) => {
    const response = await axios.get("/api/" + platform.trim().toLowerCase());
    setContests(response.data?.contests || []);
  };

  useEffect(() => {
    getContests("all");
  }, []);
  useEffect(() => {
    const query = searchParams.get("q")?.toLowerCase() || "";
    const platform = searchParams.get("platform") || "all";

    let filtered = contests;

    if (platform && platform !== "all") {
      filtered = filtered.filter(
        (contest) => contest.platform?.toLowerCase() === platform.toLowerCase()
      );
    }

    if (query) {
      filtered = filtered.filter((contest) =>
        contest.name.toLowerCase().includes(query)
      );
    }

    setFilteredContests(filtered);
  }, [searchParams, contests]);

  return (
    <section className="flex flex-col gap-4 p-4">
      {(filteredContests.length ? filteredContests : contests).map(
        (contest) => (
          <Card
            key={contest.name}
            name={contest.name}
            platform={contest.platform}
            startTime={contest.startTime}
            duration={contest.duration}
            url={contest.url}
            endTime={contest.endTime}
          />
        )
      )}
    </section>
  );
}
