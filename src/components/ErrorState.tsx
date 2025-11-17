import React from "react";
import NoDataImg from "../assets/icons/no-data.svg?react";

interface ErrorStateProps {
  load: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ load }) => {
  return (
    <section
      role="alert"
      aria-live="polite"
      className="text-center flex flex-col py-10 w-full justify-center items-center"
    >
      <NoDataImg className="w-auto h-[220px] mb-4" aria-hidden="true" />

      <p className=" my-5" data-testid="error-message">
        Nie udało się pobrać ofert — spróbuj ponownie.
      </p>

      <button
        type="button"
        onClick={load}
        className="px-4 py-3 text-xl text-white bg-secondary rounded-xl hover:cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(56,215,255,0.14)] max-w-40"
        aria-label="Pobierz oferty ponownie"
        data-testid="retry-button"
      >
        Pobierz oferty
      </button>
    </section>
  );
};

export default ErrorState;
