import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      className="mt-8 py-6 bg-background-component border border-primary rounded-t-2xl "
    >
      <div className="max-w-5xl mx-auto px-4 text-sm text-end">
        <p>
          Projekt demonstracyjny — Mini ranking ofert. ©{" "}
          {new Date().getFullYear()} Piotr Matlak
        </p>
        <p className="mt-2">
          <a href="/privacy" className="underline">
            Polityka prywatności
          </a>{" "}
          ·{" "}
          <a href="/terms" className="underline">
            Regulamin
          </a>
        </p>
      </div>
    </footer>
  );
};
