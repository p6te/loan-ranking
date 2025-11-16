import React from "react";
import type { Offer } from "../types";

export const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-white border rounded-xl p-4 mb-4 shadow-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src={offer.logo}
            alt={offer.name}
            className="w-12 h-12 object-contain"
          />
          <div>
            <div className="font-semibold">{offer.name}</div>
            <div className="text-sm text-gray-500">od {offer.apr}% RRSO</div>
          </div>
        </div>
        <div className="text-sm text-gray-400">{open ? "▲" : "▼"}</div>
      </div>

      {open && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-600">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              Kwota:{" "}
              <strong>
                {offer.minAmount}–{offer.maxAmount}
              </strong>
            </div>
            <div>
              Okres:{" "}
              <strong>
                {offer.minPeriod}–{offer.maxPeriod}
              </strong>
            </div>
            <div>
              Decyzja: <strong>{offer.decision}</strong>
            </div>
            <div>
              Ocena: <strong>{offer.rating}</strong>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-3">
            {offer.tags.map((t) => (
              <span
                key={t}
                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={() => {
              setTimeout(
                () => alert(`Przekierowano do partnera: ${offer.name}`),
                600,
              );
            }}
            className="w-full py-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white"
          >
            Sprawdź ofertę
          </button>
        </div>
      )}
    </div>
  );
};
