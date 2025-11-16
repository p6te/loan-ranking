import React, { useEffect, useRef, useState } from "react";
import InputRange from "./InputRange";

type Props = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  debounceMs?: number;
};

export const StepperWithRange: React.FC<Props> = ({
  id,
  label,
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  debounceMs = 150,
}) => {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const roundToStep = (v: number) => Math.round(v / step) * step;

  const [local, setLocal] = useState<string>(String(value));
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isDragging) {
      setLocal(String(value));
    }
  }, [value, isDragging]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, []);

  const commitValue = (raw: number) => {
    const normalized = clamp(roundToStep(raw));
    if (normalized !== value) onChange(normalized);
    setLocal(String(normalized));
  };

  const commitFromLocal = () => {
    const parsed = Number(local);
    if (local.trim() === "" || Number.isNaN(parsed)) {
      setLocal(String(value));
      return;
    }
    commitValue(parsed);
  };

  const inc = () => {
    const next = clamp(roundToStep(value + step));
    if (next !== value) onChange(next);
  };

  const dec = () => {
    const next = clamp(roundToStep(value - step));
    if (next !== value) onChange(next);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal(e.target.value);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitFromLocal();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      inc();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      dec();
    }
  };

  const onRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setLocal(String(v));

    if (debounceMs <= 0) {
      commitValue(v);
      return;
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      commitValue(v);
      debounceRef.current = null;
    }, debounceMs);
  };

  const onPointerDown = (_e: React.PointerEvent<HTMLInputElement>) => {
    setIsDragging(true);
  };

  const onPointerUp = (_e: React.PointerEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const parsed = Number(local);
    if (!Number.isNaN(parsed)) commitValue(parsed);
    setIsDragging(false);
  };

  const rangeValue = (() => {
    const parsed = Number(local);
    if (!Number.isNaN(parsed)) {
      return String(clamp(roundToStep(parsed)));
    }

    return String(value);
  })();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 justify-between">
        <label htmlFor={id} className="text-xl font-medium">
          {label}
        </label>
        <div className="flex items-center border border-primary rounded-[9px] ">
          <button
            type="button"
            onClick={dec}
            aria-label={`Zmniejsz ${label ?? "wartość"}`}
            className="px-5 py-2 bg-primary hover:bg-primary-hover disabled:opacity-70 font-extrabold  disabled:cursor-not-allowed disabled:hover:bg-primary rounded-l-lg  cursor-pointer"
            disabled={value - step < min}
          >
            −
          </button>

          <input
            id={id}
            className="no-spinner  text-xl text-center focus:outline-none"
            type="number"
            inputMode="numeric"
            value={local}
            min={min}
            max={max}
            step={step}
            onChange={onInputChange}
            onBlur={commitFromLocal}
            onKeyDown={onInputKeyDown}
            aria-label={label ?? id}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />

          <button
            type="button"
            onClick={inc}
            aria-label={`Zwiększ ${label ?? "wartość"}`}
            className="px-5 py-2 bg-primary hover:bg-primary-hover disabled:opacity-70 font-extrabold  disabled:cursor-not-allowed disabled:hover:bg-primary focus:outline-none focus:ring-2 rounded-r-lg focus:ring-blue-400 cursor-pointer"
            disabled={value + step > max}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-3 slider">
        <InputRange
          id={id}
          ariaLabel={label ?? "slider"}
          min={min}
          max={max}
          step={step}
          value={rangeValue}
          onChange={onRangeChange}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        />

        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};
