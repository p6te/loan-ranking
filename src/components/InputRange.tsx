import React from "react";

type Props = {
  id: string;
  ariaLabel?: string;
  min: number;
  max: number;
  step?: number;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPointerDown?: (e: React.PointerEvent<HTMLInputElement>) => void;
  onPointerUp?: (e: React.PointerEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function InputRange({
  id,
  ariaLabel,
  min,
  max,
  step = 1,
  value,
  onChange,
  onPointerDown,
  onPointerUp,
  className = "",
}: Props) {
  const numericValue = Number(value);
  const percent =
    max === min
      ? 0
      : Math.max(
          0,
          Math.min(100, Math.round(((numericValue - min) / (max - min)) * 100)),
        );

  const background = `linear-gradient(90deg, #3c6e71 ${percent}%, #e6e6e6 ${percent}%)`;

  return (
    <input
      id={id}
      aria-label={ariaLabel}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className={`input-range ${className} cursor-pointer`}
      style={{ background }}
    />
  );
}
