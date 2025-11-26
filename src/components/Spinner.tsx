import React from "react";

interface SpinnerProps {
  label?: string;
  fullHeight?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  label = "Loading…",
  fullHeight = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullHeight ? "py-10" : ""
      }`}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
      {label && <p className="text-sm text-slate-300">{label}</p>}
    </div>
  );
};

export default Spinner;
