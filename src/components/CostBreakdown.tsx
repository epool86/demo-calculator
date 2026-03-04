import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CostBreakdownProps {
  stampDutyMOT: number;
  stampDutyLoan: number;
  legalFees: number;
  className?: string;
}

export function CostBreakdown({
  stampDutyMOT,
  stampDutyLoan,
  legalFees,
  className,
}: CostBreakdownProps) {
  const total = stampDutyMOT + stampDutyLoan + legalFees;

  return (
    <div
      className={twMerge(
        'bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Entry Costs</h3>
        <span className="text-sm font-medium text-slate-500">Estimated</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Stamp Duty (MOT)</span>
          <span className="font-medium text-slate-900">
            {new Intl.NumberFormat('en-MY', {
              style: 'currency',
              currency: 'MYR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(stampDutyMOT)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Stamp Duty (Loan)</span>
          <span className="font-medium text-slate-900">
            {new Intl.NumberFormat('en-MY', {
              style: 'currency',
              currency: 'MYR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(stampDutyLoan)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Legal Fees (Estimated)</span>
          <span className="font-medium text-slate-900">
            {new Intl.NumberFormat('en-MY', {
              style: 'currency',
              currency: 'MYR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(legalFees)}
          </span>
        </div>

        <div className="h-px bg-slate-200 my-2" />

        <div className="flex justify-between items-center text-base font-bold text-slate-900">
          <span>Total Entry Cost</span>
          <span>
            {new Intl.NumberFormat('en-MY', {
              style: 'currency',
              currency: 'MYR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
