import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { logEvent } from "../lib/logEvent";
import { SortBy, type Offer } from "../types";
import { fetchOffers } from "../api/offersApi";

const FILTER_CHANGE_DEBOUNCE = 500;

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [amount, setAmount] = useState<number>(200);
  const [period, setPeriod] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.apr);
  const [tags, setTags] = useState<string[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOffers();
      setOffers(data);
      logEvent("view_list", { count: data.length });
    } catch (e: any) {
      setError(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const allTags = useMemo(() => {
    return Array.from(new Set(offers.flatMap((o) => o.tags))).sort();
  }, [offers]);

  const filteredOffers = useMemo(() => {
    let res = offers.filter(
      (o) =>
        (amount === null || (amount >= o.minAmount && amount <= o.maxAmount)) &&
        (period === null || (period >= o.minPeriod && period <= o.maxPeriod)),
    );

    if (tags.length) {
      res = res.filter((o) => tags.every((t) => o.tags.includes(t)));
    }

    if (sortBy === SortBy.apr) {
      return [...res].sort((a, b) => a.apr - b.apr);
    }
    return [...res].sort((a, b) => b.rating - a.rating);
  }, [offers, amount, period, sortBy, tags]);

  const logTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (logTimerRef.current) window.clearTimeout(logTimerRef.current);
    logTimerRef.current = window.setTimeout(() => {
      logEvent("filter_change", { amount, period, tags });
      logTimerRef.current = null;
    }, FILTER_CHANGE_DEBOUNCE);
    return () => {
      if (logTimerRef.current) {
        window.clearTimeout(logTimerRef.current);
        logTimerRef.current = null;
      }
    };
  }, [amount, period, tags]);

  useEffect(() => {
    logEvent("sort_change", { sortBy });
  }, [sortBy]);

  return {
    filteredOffers,
    allTags,
    loading,
    error,
    load,
    amount,
    setAmount,
    period,
    setPeriod,
    sortBy,
    setSortBy,
    tags,
    setTags,
  };
}
