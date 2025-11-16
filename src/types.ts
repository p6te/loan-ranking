export type Offer = {
  id: string;
  name: string;
  logo: string;
  apr: number;
  minAmount: number;
  maxAmount: number;
  minPeriod: number;
  maxPeriod: number;
  decision: string;
  tags: string[];
  rating: number;
};

export type EventName =
  | "view_list"
  | "filter_change"
  | "sort_change"
  | "expand_offer"
  | "cta_click";

export type AnalyticsEvent = {
  id: string;
  name: EventName;
  params?: Record<string, any>;
  ts: string;
};

export enum SortBy {
  apr = "apr",
  rating = "rating",
}

export type Limits = {
  AMOUNT_MIN: number;
  AMOUNT_MAX: number;
  PERIOD_MIN: number;
  PERIOD_MAX: number;
};
