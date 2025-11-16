import type { AnalyticsEvent, EventName } from "../types";

const STORAGE_KEY = "mini_ranking_events_v1";

function read(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function logEvent(name: EventName, params?: Record<string, any>) {
  const ev: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    params,
    ts: new Date().toISOString(),
  };

  const arr = read();

  arr.push(ev);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

  if (import.meta.env.DEV) console.log("logEvent", ev);
}
