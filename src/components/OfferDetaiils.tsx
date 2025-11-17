import React from "react";

type OfferDetailsProps = {
  name: string;
  value: string;
  separator?: boolean;
  isSm?: boolean;
};

const OfferDetails: React.FC<OfferDetailsProps> = ({
  name,
  value,
  separator,
  isSm,
}) => {
  return (
    <div
      role="group"
      className={`flex-1 flex md:flex-col flex-row justify-between md:justify-center ml-3 p-1 md:p-0 ${
        separator ? (isSm ? "border-b" : "border-r") : ""
      } border-primary`}
    >
      <span className="sr-only">{name}</span>

      <span className="inline-block" aria-hidden="true">
        {name}
      </span>
      <strong
        className="inline-block font-bold"
        aria-label={`${name}: ${value}`}
      >
        {value}
      </strong>
    </div>
  );
};

export default OfferDetails;
