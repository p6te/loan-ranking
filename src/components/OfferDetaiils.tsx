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
      className={`flex-1 flex md:flex-col flex-row justify-between md:justify-center ml-3 p-1 md:p-0 ${separator ? (isSm ? "border-b" : "border-r") : ""} border-primary`}
    >
      <span className="inline-block">{name}</span>
      <strong className="inline-block font-bold">{value}</strong>
    </div>
  );
};

export default OfferDetails;
