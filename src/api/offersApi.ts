import type { Offer } from "../types";

const OFFERS_URL = "/offers.json";

export async function fetchOffers(): Promise<Offer[]> {
  // simulate fetching duration
  await new Promise((res) => setTimeout(res, 600 + Math.random() * 900));

  if (Math.random() < 0.1) {
    const err: any = new Error("API failure (simulated)");
    err.code = "SIMULATED_API_FAILURE";
    throw err;
  }
  const res = await fetch(OFFERS_URL);
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.json() as Promise<Offer[]>;
}
