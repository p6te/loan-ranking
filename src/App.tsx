import { useOffers } from "./hooks/useOffers";
import { OfferCard } from "./components/OfferCard";

export default function App() {
  const { filteredOffers, loading, error, load } = useOffers();

  return (
    <div className="min-h-[101vh] bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Ranking ofert</h1>

        {loading && (
          <div className="space-y-3">
            <div className="h-20 bg-white animate-pulse rounded-xl border" />
          </div>
        )}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={load}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        )}
        {!loading &&
          !error &&
          filteredOffers.map((o) => <OfferCard key={o.id} offer={o} />)}
      </div>
    </div>
  );
}
