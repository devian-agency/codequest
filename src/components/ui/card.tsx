"use client";
import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface CardProps {
  name: string;
  platform?: string;
  startTime: string;
  duration: string;
  url: string;
  endTime: string;
}

const googleDate = (date: string) =>
  new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatDuration = (duration: string) => {
  const totalSeconds = parseInt(duration);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
}

function formatTime(ms: number, label?: string) {
  const totalSeconds = Math.floor(ms / 1000);

  const weeks = Math.floor(totalSeconds / (7 * 24 * 3600));
  const days = Math.floor((totalSeconds % (7 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (weeks) parts.push(`${weeks}w `);
  if (days) parts.push(`${days}d `);
  if (hours) parts.push(`${hours}h `);
  if (minutes) parts.push(`${minutes}m `);
  if (seconds || parts.length === 0) parts.push(`${seconds}s `);

  return `${label ? label+" " : ""}${parts.join(" ")}`;
}

export default function ContestCard({
  name,
  platform,
  startTime,
  duration,
  url,
  endTime,
}: CardProps) {
  const [remaining, setRemaining] = useState("")
  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const interval = setInterval(() => {
      const now = Date.now();

      if (now < start) {
        const diff = start - now;
        setRemaining(formatTime(diff, "Starts in: "));
      } else if (now >= start && now < end) {
        const diff = end - now;
        setRemaining(formatTime(diff, "Ends in: "));
      } else {
        setRemaining("Event ended");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 1000, damping: 17, mass: 2 }}
      className="bg-card rounded-border p-4 hover:bg-card-hover cursor-pointer block"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">{name}</h2>
        <span className="text-sm text-accent">{platform}</span>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div>
          {duration && (
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
              <Clock size={16} />
              <span>{formatDuration(duration)} </span>
            </div>
          )}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            <span><CalendarDays size={16} /></span>
            <span>{new Date(startTime).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).replace("am", "AM").replace("pm", "PM")}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            {remaining}
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4 text-sm">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Open
          </Link>
          <Link
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
              name
            )}&dates=${googleDate(startTime)}/${googleDate(
              endTime
            )}}&location=${encodeURIComponent(url)}&ctz=${encodeURIComponent(
              timeZone
            )}&sf=true&output=xml`}
            target="_blank"
            className="text-green-400 hover:underline"
          >
            Add to Calendar
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
