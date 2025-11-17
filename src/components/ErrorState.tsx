import NoDataImg from "../assets/icons/no-data.svg?react";

interface ErrorStateProps {
  load: () => void;
}

export const ErrorState = ({ load }: ErrorStateProps) => {
  return (
    <div className="text-center flex-col py-10 w-full flex justify-center">
      <NoDataImg className="w-auto h-[300px]" />
      <p className=" my-5">Nie udało się pobrać ofert, spróbuj ponownie!</p>
      <button
        onClick={load}
        className="px-4 py-3 text-xl  text-white bg-secondary w-50 m-auto rounded-xl hover:cursor-pointer"
      >
        Pobierz oferty
      </button>
    </div>
  );
};
