"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeSliderProps {
  minDate: Date;
  maxDate: Date;
  fromDate: Date;
  toDate: Date;
  onChange: (from: Date, to: Date) => void;
}

function formatShort(d: Date): string {
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" });
}

function dateToValue(date: Date, min: Date, max: Date): number {
  const range = max.getTime() - min.getTime();
  if (range <= 0) return 100;
  return ((date.getTime() - min.getTime()) / range) * 100;
}

function valueToDate(value: number, min: Date, max: Date): Date {
  const range = max.getTime() - min.getTime();
  return new Date(min.getTime() + (value / 100) * range);
}

export function TimeSlider({ minDate, maxDate, fromDate, toDate, onChange }: TimeSliderProps) {
  const [fromVal, setFromVal] = useState(() => dateToValue(fromDate, minDate, maxDate));
  const [toVal, setToVal] = useState(() => dateToValue(toDate, minDate, maxDate));
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external date changes
  useEffect(() => {
    setFromVal(dateToValue(fromDate, minDate, maxDate));
    setToVal(dateToValue(toDate, minDate, maxDate));
  }, [fromDate, toDate, minDate, maxDate]);

  const emitChange = useCallback((fv: number, tv: number) => {
    const from = valueToDate(fv, minDate, maxDate);
    const to = valueToDate(tv, minDate, maxDate);
    onChange(from, to);
  }, [minDate, maxDate, onChange]);

  // Play animation: advance toDate by 1 day every 500ms
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setToVal((prev) => {
          const next = Math.min(prev + 1, 100);
          if (next >= 100) {
            setPlaying(false);
          }
          // Use fromVal from closure
          emitChange(fromVal, next);
          return next;
        });
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, fromVal, emitChange]);

  const handleFromChange = (val: number) => {
    const clamped = Math.min(val, toVal - 1);
    setFromVal(clamped);
    emitChange(clamped, toVal);
  };

  const handleToChange = (val: number) => {
    const clamped = Math.max(val, fromVal + 1);
    setToVal(clamped);
    emitChange(fromVal, clamped);
  };

  const handleReset = () => {
    setPlaying(false);
    setFromVal(0);
    setToVal(100);
    emitChange(0, 100);
  };

  const currentFrom = valueToDate(fromVal, minDate, maxDate);
  const currentTo = valueToDate(toVal, minDate, maxDate);

  return (
    <div className="shrink-0 border-t border-white/10 bg-gray-950/90 backdrop-blur-sm px-4 py-3">
      <div className="mx-auto max-w-screen-xl">
        {/* Labels */}
        <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
          <span>{formatShort(currentFrom)}</span>
          <span className="font-medium text-gray-200">
            {formatShort(currentFrom)} — {formatShort(currentTo)}
          </span>
          <span>{formatShort(currentTo)}</span>
        </div>

        {/* Slider track */}
        <div className="relative mb-3 h-2">
          {/* Background */}
          <div className="absolute inset-0 rounded-full bg-white/10" />
          {/* Active range */}
          <div
            className="absolute top-0 bottom-0 rounded-full bg-red-500/50"
            style={{ left: `${fromVal}%`, right: `${100 - toVal}%` }}
          />
          {/* From thumb */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={fromVal}
            onChange={(e) => handleFromChange(Number(e.target.value))}
            className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
          />
          {/* To thumb */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={toVal}
            onChange={(e) => handleToChange(Number(e.target.value))}
            className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleReset}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
