import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ResultCardProps {
  label: string;
  value: number;
  unit?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function ResultCard({
  label,
  value,
  unit = 'MYR',
  className,
  icon,
}: ResultCardProps) {
  return (
    <div
      className={twMerge(
        'bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col gap-2 transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        {icon && <div className="text-indigo-500">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-slate-900">
          {new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value)}
        </span>
        <span className="text-sm font-medium text-slate-400">{unit}</span>
      </div>
    </div>
  );
}
