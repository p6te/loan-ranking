import React from "react";
import { screens, useMediaQuery } from "../hooks/useMediaQuery";

interface Props {
  number?: number;
}

const SkeletonLoadingOffer: React.FC<Props> = ({ number = 1 }) => {
  const isSm = useMediaQuery(screens.sm);

  return (
    <div
      className="bg-white border-primary border component-shadow rounded-xl p-4 mb-4 md:h-[307px]"
      role="status"
      aria-busy="true"
      aria-label="Ładowanie oferty"
    >
      <div className="relative flex items-center justify-center md:justify-between md:h-[100px]  ">
        <div className="flex items-center w-full">
          {!isSm && (
            <span className="left-0 text-xl w-3 md:text-3xl font-bold ml-1 md:ml-2 text-secondary">
              {number}
            </span>
          )}

          <div className="flex items-center gap-5 w-full mb-3  justify-center">
            <div className="w-40 ml-5 md:h-16 rounded-md bg-gray-200 animate-pulse h-[100px] " />

            {!isSm && (
              <div className="flex-1">
                <div className="h-6 w-40 rounded-md bg-gray-200 animate-pulse" />
              </div>
            )}

            <div className="ml-auto hidden md:block">
              <div className="h-10 w-32 rounded-xl bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {isSm && (
        <div className="my-3">
          <div className="h-10 w-full rounded-xl bg-gray-200 animate-pulse" />
        </div>
      )}

      <div
        className={`border-t border-primary flex justify-between py-3 ${isSm ? "flex-col" : "flex-row"} md:h-[73px]`}
      >
        <div
          className={`flex flex-1 w-full flex-wrap md:gap-3 ${isSm ? "flex-col" : "flex-row"}`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 w-full justify-between min-w-[120px] md:min-w-[120px] flex p-2 ${isSm ? "flex-row" : "flex-col"}`}
            >
              <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse mb-2" />
              <div className="h-5 w-20 md:w-full rounded-md bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-primary flex justify-center items-center py-3 gap-2 flex-wrap md:h-[55px]">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="px-3 py-1 rounded-full text-sm bg-gray-200 animate-pulse w-24 h-8"
          />
        ))}
      </div>

      <div className="border-t border-primary flex justify-center items-center pt-3 gap-2">
        <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      </div>

      <div className="max-h-0 overflow-hidden" aria-hidden="true">
        <div className="flex flex-col pt-3 gap-2">
          <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse" />
          <ul className="list-disc ml-6">
            <li className="h-3 w-full rounded-md bg-gray-200 animate-pulse mb-2" />
            <li className="h-3 w-full rounded-md bg-gray-200 animate-pulse mb-2" />
            <li className="h-3 w-full rounded-md bg-gray-200 animate-pulse mb-2" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingOffer;
