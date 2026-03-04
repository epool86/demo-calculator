import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function InputGroup({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  className,
}: InputGroupProps) {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
          <span className="text-slate-400 text-sm font-medium">{unit}</span>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-24 text-right text-slate-900 font-semibold outline-none bg-transparent"
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-colors"
      />
      <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
