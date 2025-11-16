import React, { useEffect, useRef, useState } from "react";
import type { Offer } from "../types";
import { logEvent } from "../lib/logEvent";
import ArrowIcon from "../assets/icons/arrow.svg?react";
import OfferDetails from "./OfferDetaiils";
import { screens, useMediaQuery } from "../hooks/useMediaQuery";

export const OfferCard: React.FC<{ offer: Offer; number: number }> = ({
  offer,
  number,
}) => {
  const isSm = useMediaQuery(screens.sm);
  const [open, setOpen] = React.useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxH(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="bg-white border-primary border   component-shadow rounded-xl p-4 mb-4 ">
      <div className="relative flex items-center justify-center md:justify-between ">
        <div className=" flex items-center ">
          {!isSm && (
            <span className="  left-0 text-xl w-3 md:text-3xl font-bold ml-1 md:ml-2 text-secondary">
              {number}
            </span>
          )}
          <div className="flex items-center gap-5">
            <img
              src={offer.logo}
              alt={offer.name}
              className="w-auto h-full object-contain min-h-20 "
            />
          </div>
          {!isSm && (
            <strong className="font-semibold text-xl mdtext-3xl">
              {offer.name}
            </strong>
          )}
        </div>
        <div className="justify-between flex gap-3 flex-wrap">
          {!isSm && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                logEvent("cta_click", { id: offer.id, name: offer.name });
                setTimeout(
                  () => alert(`Przekierowano do partnera: ${offer.name}`),
                  600,
                );
              }}
              className=" py-2 px-4 rounded-xl bg-secondary text-white cursor-pointer hover:bg-secondary-hover text-nowrap"
            >
              Sprawdź ofertę
            </button>
          )}
        </div>
      </div>
      {isSm && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            logEvent("cta_click", { id: offer.id, name: offer.name });
            setTimeout(
              () => alert(`Przekierowano do partnera: ${offer.name}`),
              600,
            );
          }}
          className=" py-2 px-4 mb-3  w-full rounded-xl bg-secondary text-white cursor-pointer hover:bg-secondary-hover text-nowrap"
        >
          Sprawdź ofertę
        </button>
      )}

      <div
        className={`border-t border-primary flex justify-between py-3 ${isSm ? "flex-col" : "flex-row"}`}
      >
        {isSm && (
          <div className="mb-2 ml-3">
            <span className="  left-0 text-xl w-3 md:text-3xl font-bold ml-1 md:ml-2 text-secondary">
              {number}
            </span>
            <strong className="font-semibold  w-full   ml-3 text-xl">
              {offer.name}
            </strong>
          </div>
        )}
        <OfferDetails
          name="RRSO"
          value={`od ${offer.apr}%`}
          separator
          isSm={isSm}
        />
        <OfferDetails
          name="Kwota"
          value={`${offer.minAmount}–${offer.maxAmount} zł`}
          separator
          isSm={isSm}
        />
        <OfferDetails
          name="Okres"
          value={
            offer.minPeriod === 1 && offer.maxPeriod === 1
              ? "1 miesiąc"
              : `${offer.minPeriod}–${offer.maxPeriod} miesięcy`
          }
          separator
          isSm={isSm}
        />
        <OfferDetails
          name="Decyzja"
          value={offer.decision}
          separator
          isSm={isSm}
        />
        <OfferDetails name="Ocena" value={`${offer.rating}/100`} />
      </div>
      <div
        className="border-t border-primary flex justify-center items-center pt-3 gap-2 hover:cursor-pointer"
        onClick={() => {
          setOpen((s) => !s);
          logEvent("expand_offer", { id: offer.id });
        }}
      >
        <span>{open ? "Zwiń szczegóły" : "Pokaż szczegóły"}</span>
        <ArrowIcon
          className={`w-8 h-8 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        style={{
          maxHeight: open ? `${maxH}px` : "0px",
          overflow: "hidden",
          transition: "max-height 300ms ease",
        }}
        aria-hidden={!open}
      >
        <div ref={contentRef} className="  flex flex-col pt-3 gap-2">
          <strong>Zalety:</strong>
          <ul className="list-disc ml-6">
            <li>Lorem, ipsum dolor sit amet consectetur</li>
            <li>Lorem, ipsum dolor sit amet consectetur</li>
            <li>Lorem, ipsum dolor sit amet consectetur</li>
            <li>Lorem, ipsum dolor sit amet consectetur</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
